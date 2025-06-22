import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsController } from './pets/pets.controller';

@Module({
  imports: [],
  controllers: [AppController, PetsController],
  providers: [AppService],
})
export class AppModule {}
