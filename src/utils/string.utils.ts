export const toNumber = (str: any) => {
  const n = Number(String(str).replace(/[^0-9.-]/g, ''));
  return Boolean(n) ? n : 0;
};

export const strClock2Num = (str = '') => {
  const splitted = str.split(':');
  return toNumber(splitted?.[0]) + toNumber(splitted?.[1]) / 60;
};
