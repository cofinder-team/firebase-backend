import { Coupang, CoupangTarget, Price } from '../../entity/coupang.entity';
import delay from '../util/delay';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'ko-KR,ko;q=0.9',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  'Sec-Ch-Ua':
    '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
};

type Base = {
  price?: { couponPrice?: string; salePrice?: string; originPrice?: string };
};

const getLowerPrice = (price1: Price, price2: Price): Price => {
  if (price1 === null) return price2;
  if (price2 === null) return price1;
  return Math.min(price1, price2);
};

const collect = async (target: CoupangTarget): Promise<Coupang> => {
  const { itemId, optionId, productId, vendorIds } = target;

  const getPrice = async (vendorId: number): Promise<Price> => {
    const url = `https://www.coupang.com/vp/products/${productId}/vendoritems/${vendorId}`;
    const response = await fetch(url, { headers })
      .then((res) => res.json())
      .catch((err) => {
        console.log(target);
        console.log(err);
      });

    const soldOut: boolean = response?.soldOut ?? true;
    if (soldOut) return null;

    const bases: Base[] = response?.quantityBase ?? [];
    const original: Price = bases.reduce((price: Price, base: Base): Price => {
      const pstr: string | undefined =
        base?.price?.couponPrice ??
        base?.price?.salePrice ??
        base?.price?.originPrice;
      const pval: Price = pstr ? parseInt(pstr.replace(/,/gi, '')) : null;
      return getLowerPrice(price, pval);
    }, null);
    if (original === null) return null;

    const ccidEligible: boolean = response?.ccidEligible ?? true;
    if (ccidEligible) return original;

    const ccidPercent: number =
      response?.ccidInfo?.highestWowOnlyCcidDiscountRate ?? 0;
    return Math.floor(original * (1 - ccidPercent / 100));
  };

  const comparePriceEach = async (
    promise: Promise<Price>,
    vendorId: number,
  ): Promise<Price> => {
    const p1 = await promise;
    await delay(Math.random() * 1000);

    const p2 = await getPrice(vendorId);
    return getLowerPrice(p1, p2);
  };

  const price = await vendorIds.reduce(comparePriceEach, Promise.resolve(null));
  return { itemId, optionId, productId, vendorIds, price, time: new Date() };
};

export default collect;
