import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { BasketballService } from 'src/basketball/basketball.service';
import puppeteer, { Browser, Page } from 'puppeteer';
import { LINK_BASKETBALL, TEXT_NO_EVENT } from 'src/utils/constants.utils';
import { extractLiveBasketball } from 'src/extracts/basketball.extract';

const GET_DATA = 'GET_DATA';

@Injectable()
export class CronJobsService {
  private browser: Browser;
  private page: Page;
  constructor() {
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

  @Cron(CronExpression.EVERY_5_SECONDS, { name: GET_DATA })
  async getData() {
    return await this.getBasketball();
  }

  async getBasketball() {
    const ret = await extractLiveBasketball(this.browser, this.page);
    console.log(ret?.[0]?.clock, ret.length);
    return ret;
  }
}
