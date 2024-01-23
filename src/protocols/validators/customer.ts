import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  IsInt,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class CreateCustomerValidator {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @Matches(/^\d{10,11}$/)
  phone: string;

  @Expose()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsInt({ each: true })
  address: [number, number];
}

export class FilterCustomerValidator {
  @Expose()
  @IsOptional()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  @Matches(/\d{1,11}/)
  phone: string;
}
