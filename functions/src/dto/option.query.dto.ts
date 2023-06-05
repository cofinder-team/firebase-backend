import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class OptionQueryDto {
  @Expose()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  @IsOptional()
  care?: boolean = false;

  @Expose()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  @IsOptional()
  unopened?: boolean = false;
}
