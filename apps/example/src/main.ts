import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExampleModule } from './example.module';

async function bootstrap() {
  const app = await NestFactory.create(ExampleModule);
  app.enableVersioning({ type: VersioningType.URI, prefix: 'api/v' });
  await app.listen(3000);
}
bootstrap();
