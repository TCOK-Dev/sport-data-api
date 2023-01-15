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
    try {
      for (let leagueIndex = 0; leagueIndex < data.length; leagueIndex++) {
        const league = this.dataSource.manager.create(
          Basketball,
          data[leagueIndex],
        );

        const existLeague = await this.dataSource.manager.findOne(Basketball, {
          where: { title: league.title },
        });

        const updatedLeague = existLeague
          ? existLeague
          : await this.dataSource.manager.save(Basketball, league);

        for (let gameIndex = 0; gameIndex < league.games.length; gameIndex++) {
          const game = this.dataSource.manager.create(
            BasketballGame,
            league.games[gameIndex],
          );

          const existGame = await this.dataSource.manager.findOne(
            BasketballGame,
            {
              where: {
                title: league.title,
                awayTeam: game.awayTeam,
                homeTeam: game.homeTeam,
              },
            },
          );

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

          const updatedGame = await this.dataSource.manager.save(
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

          for (
            let scoreIndex = 0;
            scoreIndex < game.scores.length;
            scoreIndex++
          ) {
            const score = this.dataSource.manager.create(BasketballGameScore, {
              ...game.scores[scoreIndex],
              playedTime: playedTime,
              game: updatedGame,
            });

            const existScore = await this.dataSource.manager.findOne(
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

            if (existScore) {
            } else {
              await this.dataSource.manager.save(BasketballGameScore, score);
            }
          }
        }
      }
    } catch (err) {
      // since we have errors lets rollback the changes we made
      this.logger.error(err);
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
