import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketballGameScore } from 'src/basketball-game-score/entities/basketball-game-score.entity';
import { BasketballGame } from 'src/basketball-game/entities/basketball-game.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBasketballDto } from './dto/create-basketball.dto';
import { UpdateBasketballDto } from './dto/update-basketball.dto';
import { Basketball } from './entities/basketball.entity';

@Injectable()
export class BasketballService {
  private readonly logger = new Logger(BasketballService.name);

  constructor(
    @InjectRepository(Basketball)
    private readonly basketballRepository: Repository<Basketball>,
    private dataSource: DataSource,
  ) {}

  create(data: CreateBasketballDto) {
    return 'This action adds a new basketball';
  }

  async save(data: CreateBasketballDto) {
    return '';
  }

  async multiSave(data: CreateBasketballDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let leagueIndex = 0; leagueIndex < data.length; leagueIndex++) {
        const league = data[leagueIndex];
        const existLeague = await queryRunner.manager.findOne(Basketball, {
          where: { title: league.title },
        });

        if (existLeague) {
          for (
            let gameIndex = 0;
            gameIndex < league.games.length;
            gameIndex++
          ) {
            const game = league.games[gameIndex];

            const existGame = await queryRunner.manager.findOne(
              BasketballGame,
              {
                where: {
                  title: league.title,
                  awayTeam: game.awayTeam,
                  homeTeam: game.homeTeam,
                },
              },
            );

            if (existGame) {
              for (
                let scoreIndex = 0;
                scoreIndex < game.scores.length;
                scoreIndex++
              ) {
                const score = game.scores[scoreIndex];

                const existScore = await queryRunner.manager.findOne(
                  BasketballGameScore,
                  {
                    where: {
                      title: league.title,
                      awayTeam: game.awayTeam,
                      homeTeam: game.homeTeam,
                      awayScore: game.awayScore,
                      homeScore: game.homeScore,
                      awaySpread: game.awaySpread,
                      homeSpread: game.homeSpread,
                      awayOverUnder: game.awayOverUnder,
                      homeOverUnder: game.homeOverUnder,
                    },
                  },
                );

                if (existScore) {
                } else {
                  const resScore = await queryRunner.manager.save({
                    ...score,
                    game: existGame,
                  });
                }
              }
            } else {
              const resGame = await queryRunner.manager.save({
                ...game,
                league: existGame,
              });
            }
          }
        } else {
          const resLeague = await queryRunner.manager.save(league);
        }

        await queryRunner.commitTransaction();
      }
    } catch (err) {
      // since we have errors lets rollback the changes we made
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all basketball`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketball`;
  }

  update(id: number, updateBasketballDto: UpdateBasketballDto) {
    return `This action updates a #${id} basketball`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketball`;
  }
}
