import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [PetsModule],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('pets');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'pets', method: RequestMethod.GET });
  }
}
