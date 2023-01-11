import { Browser, Page } from 'puppeteer';

export const extractLiveBasketball = async (browser: Browser, page: Page) => {
  const liveData = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('.happening-now-bucket .grouped-events'),
    ).map((group) => {
      const title =
        group.querySelector('.league-header-collapsible__description')
          ?.innerHTML ?? '';

      const couponData = Array.from(group.querySelectorAll('sp-coupon')).map(
        (coupon) => {
          const score = coupon.querySelector('sp-score-coupon');

          const competitors = coupon.querySelector(
            'sp-competitor-coupon div.competitors',
          );

          const strQuarter = (
            score.querySelector('span.gs')?.innerHTML ?? ''
          ).trim();
          const strClock = (
            score.querySelector('time.clock > sp-clock > span.gs')?.innerHTML ??
            ''
          ).trim();
          const scores = Array.from(
            score.querySelectorAll('sp-score-result > span.score-nr'),
          ).map((result) => (result?.innerHTML ?? '')?.trim());
          const teams = competitors
            ? Array.from(
                competitors.querySelectorAll('h4.competitor-name > span.name'),
              ).map((competitor) => (competitor?.innerHTML ?? '')?.trim())
            : [];
          const outcomes = Array.from(
            coupon.querySelectorAll('sp-two-way-vertical'),
          );

          const spreads = Array.from(
            outcomes?.[0] ? outcomes?.[0].querySelectorAll('li') : [],
          ).map((liItem) => {
            return Array.from(
              liItem?.querySelectorAll('sp-outcome > button span'),
            )
              .map((spanItem) => (spanItem?.innerHTML ?? '')?.trim())
              .filter((a) => a)
              .join(' ');
          });

          const totals = Array.from(
            outcomes?.[2] ? outcomes?.[2].querySelectorAll('li') : [],
          ).map((liItem) => {
            return Array.from(
              liItem?.querySelectorAll('sp-outcome > button span'),
            )
              .slice(1)
              .map((spanItem) => (spanItem?.innerHTML ?? '')?.trim())
              .filter((a) => a)
              .join(' ');
          });

          const toNumber = (str = '') => {
            const n = Number(String(str).replace(/[^0-9.-]/g, ''));
            return Boolean(n) ? n : 0;
          };

          const strClock2num = (str = '') => {
            const splitted = str.split(':');
            return toNumber(splitted?.[0]) + toNumber(splitted?.[1]) / 60;
          };

          return {
            title: title,
            quarter: strQuarter,
            clock: strClock2num(strClock),
            awayTeam: teams?.[0] ?? '',
            homeTeam: teams?.[1] ?? '',
            awayScore: scores?.[0] ?? '',
            homeScore: scores?.[1] ?? '',
            awaySpread: spreads?.[0] ?? '',
            homeSpread: spreads?.[1] ?? '',
            awayOverUnder: totals?.[0] ?? '',
            homeOverUnder: totals?.[1] ?? '',
          };
        },
      );

      return couponData;
    });
  });

  const flattedData = liveData.reduce(
    (ret, cur) => (Array.isArray(cur) ? [...ret, ...cur] : [...ret, cur]),
    [],
  );

  return flattedData;
};
