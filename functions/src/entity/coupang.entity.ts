export type Price = number | null;

export class Coupang {
  itemId: number;
  optionId: number;
  productId: number;
  vendorIds: number[];
  price: Price;
  time: Date;
}

export type CoupangTarget = Omit<Coupang, 'price' | 'time'>;
