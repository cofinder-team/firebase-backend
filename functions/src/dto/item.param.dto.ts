import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ItemParamDto {
  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  itemId: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  optionId: string;
}
