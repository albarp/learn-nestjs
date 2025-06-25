import { IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;
  @IsNumber()
  age: number;
  @IsString()
  type: string;
}
