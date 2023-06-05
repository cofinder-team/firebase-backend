import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsDateString } from 'class-validator';

export class DataBodyDto {
  @Expose()
  @Transform(({ value }) => new Date(value).toISOString().split('T')[0])
  @IsDateString()
  date: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  low: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  mid: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  high: number;
}
