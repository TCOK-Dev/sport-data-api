import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import puppeteer, { Browser, Page } from 'puppeteer';
import { CreateBasketballGameScoreDto } from 'src/basketball-game-score/dto/create-basketball-game-score.dto';
import { BasketballGameService } from 'src/basketball-game/basketball-game.service';
import { CreateBasketballGameDto } from 'src/basketball-game/dto/create-basketball-game.dto';
import { BasketballService } from 'src/basketball/basketball.service';
import { CreateBasketballDto } from 'src/basketball/dto/create-basketball.dto';
import { extractLiveBasketball } from 'src/extracts/basketball.extract';
import { LINK_BASKETBALL, TEXT_NO_EVENT } from 'src/utils/constants.utils';

const GET_DATA = 'GET_DATA';

@Injectable()
export class CronJobsService {
  private readonly logger = new Logger(CronJobsService.name);

  private browser: Browser;
  private page: Page;

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private basketballService: BasketballService,
    private basketballGameService: BasketballGameService,
  ) {
    this.initBrowser();
  }

  async initBrowser() {
    // open browser
    this.browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
    });

    //   open new tab and go
    this.page = await this.browser.newPage();
    await this.page?.goto(LINK_BASKETBALL, { waitUntil: 'networkidle0' });

    //   reload if no data
    await this.page?.evaluate(
      ({ TEXT_NO_EVENT }) => {
        const eventText =
          document.querySelector('div.no-events-available')?.innerHTML ?? '';

        if (eventText === TEXT_NO_EVENT) {
          location.reload();
        }
      },
      { TEXT_NO_EVENT },
    );

    //   wait for loading data
    await this.page?.waitForSelector('.happening-now-bucket');
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: GET_DATA })
  async grabSports() {
    this.logger.warn(
      'Cron Job<Get Sport Data> is started. This will run every 10 seconds',
    );

    const basketballData = await this.getBasketball();

    const leagues = basketballData.map((dataItem) => {
      const league: CreateBasketballDto = {
        title: dataItem.title,
        games: basketballData
          .filter((item) => item.title === dataItem.title)
          .map((gameItem, gameItemIndex, leagueGames) => {
            return {
              title: gameItem.title,
              quarter: gameItem.quarter,
              clock: gameItem.clock,
              awayTeam: gameItem.awayTeam,
              homeTeam: gameItem.homeTeam,
              awayScore: gameItem.awayScore,
              homeScore: gameItem.homeScore,
              awaySpread: gameItem.awaySpread,
              homeSpread: gameItem.homeSpread,
              awayOverUnder: gameItem.awayOverUnder,
              homeOverUnder: gameItem.homeOverUnder,
              scores: leagueGames
                .filter(
                  (item) =>
                    item.awayTeam === gameItem.awayTeam &&
                    item.homeTeam == gameItem.homeTeam,
                )
                .map(
                  (item) =>
                    ({
                      title: item.title,
                      quarter: item.quarter,
                      clock: item.clock,
                      awayTeam: item.awayTeam,
                      homeTeam: item.homeTeam,
                      awayScore: item.awayScore,
                      homeScore: item.homeScore,
                      awaySpread: item.awaySpread,
                      homeSpread: item.homeSpread,
                      awayOverUnder: item.awayOverUnder,
                      homeOverUnder: item.homeOverUnder,
                    } as unknown as CreateBasketballGameScoreDto),
                ),
            } as unknown as CreateBasketballGameDto;
          }),
      };

      return league;
    });

    await this.basketballService.multiSave(leagues);
    this.logger.log(`Saved ${leagues.length} basketball leagues`);
  }

  async getBasketball() {
    const ret = await extractLiveBasketball(this.browser, this.page);
    return ret;
  }
}
