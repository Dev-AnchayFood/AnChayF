import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InsertProductsDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
