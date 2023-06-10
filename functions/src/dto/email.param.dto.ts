import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class EmailParamDto {
  @Expose()
  @IsString()
  @IsEmail()
  email: string;
}
