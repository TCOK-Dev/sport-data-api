import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketballGameScore } from 'src/basketball-game-score/entities/basketball-game-score.entity';
import { BasketballGame } from 'src/basketball-game/entities/basketball-game.entity';
import { toNumber } from 'src/utils/string.utils';
import { DataSource, Repository } from 'typeorm';
import { CreateBasketballDto } from './dto/create-basketball.dto';
import { UpdateBasketballDto } from './dto/update-basketball.dto';
import { Basketball } from './entities/basketball.entity';

@Injectable()
export class BasketballService {
  private readonly logger = new Logger(BasketballService.name);

  constructor(
    @InjectRepository(Basketball)
    private readonly repository: Repository<Basketball>,
    private dataSource: DataSource,
  ) {}

  async create(data: CreateBasketballDto) {
    return await this.repository.save(data);
  }

  async multiSave(data: CreateBasketballDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let leagueIndex = 0; leagueIndex < data.length; leagueIndex++) {
        const league = queryRunner.manager.create(
          Basketball,
          data[leagueIndex],
        );
        const existLeague = await queryRunner.manager.findOne(Basketball, {
          where: { title: league.title },
        });

        const updatedLeague = existLeague
          ? existLeague
          : await queryRunner.manager.save(Basketball, league);

        for (let gameIndex = 0; gameIndex < league.games.length; gameIndex++) {
          const game = queryRunner.manager.create(
            BasketballGame,
            league.games[gameIndex],
          );

          const existGame = await queryRunner.manager.findOne(BasketballGame, {
            where: {
              title: league.title,
              awayTeam: game.awayTeam,
              homeTeam: game.homeTeam,
            },
          });

          const isNBA = game.quarter?.[1] === 'Q';
          const isCG = game.quarter?.[1] === 'H';

          const playedTime = isNBA
            ? // quarter 12min * 4
              (toNumber(game.quarter?.[0]) - 1) * 720 +
              (720 - toNumber(game.clock))
            : isCG
            ? // half 20min * 2
              (toNumber(game.quarter?.[0]) - 1) * 1200 +
              (1200 - toNumber(game.clock))
            : 0;

          const finishAt = new Date();
          finishAt.setSeconds(
            finishAt.getSeconds() +
              (isNBA
                ? // quarter 12min * 4
                  (4 - toNumber(game.quarter?.[0])) * 720 + game.clock
                : isCG
                ? // half 20min * 2
                  (2 - toNumber(game.quarter?.[0])) * 1200 + game.clock
                : 0) +
              10,
          );

          const updatedGame = await queryRunner.manager.save(
            BasketballGame,
            existGame
              ? {
                  ...existGame,
                  ...game,
                  finishAt: finishAt,
                  playedTime: playedTime,
                  league: updatedLeague,
                }
              : {
                  ...game,
                  finishAt: finishAt,
                  playedTime: playedTime,
                  league: updatedLeague,
                },
          );

          const score = queryRunner.manager.create(BasketballGameScore, {
            ...game,
            playedTime: playedTime,
            game: updatedGame,
          });

          const existScore = await queryRunner.manager.findOne(
            BasketballGameScore,
            {
              where: {
                title: score.title,
                awayTeam: score.awayTeam,
                homeTeam: score.homeTeam,
                awayScore: score.awayScore,
                homeScore: score.homeScore,
                awaySpread: score.awaySpread,
                homeSpread: score.homeSpread,
                awayOverUnder: score.awayOverUnder,
                homeOverUnder: score.homeOverUnder,
              },
            },
          );

          if (!existScore) {
            await queryRunner.manager.save(BasketballGameScore, score);
          }
        }
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['games.scores'],
    });
  }

  async update(id: number, updateBasketballDto: UpdateBasketballDto) {
    return await this.repository.update(id, updateBasketballDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
