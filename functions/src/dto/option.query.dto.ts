import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class OptionQueryDto {
  @Expose()
  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  @IsOptional()
  care?: boolean = false;

  @Expose()
  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  @IsOptional()
  unopened?: boolean = false;
}
