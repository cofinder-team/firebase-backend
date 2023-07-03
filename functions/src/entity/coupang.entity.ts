export class Coupang {
  itemId: number;
  optionId: number;
  productId: number;
  vendorIds: number[];
  price: number;
  time: Date;
}

export type CoupangTarget = Omit<Coupang, 'price' | 'time'>;
