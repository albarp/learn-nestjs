import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger) middleware globale, ma non accetta DI. Per quello bisogna andare di Module
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
