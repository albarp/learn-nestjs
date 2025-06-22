import { Module } from '@nestjs/common';
import { PetsController } from './pets/pets.controller';

@Module({
  imports: [],
  controllers: [PetsController],
  providers: [],
})
export class AppModule {}
