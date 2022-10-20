import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('JuanBreath Api Documentation')
    .setDescription('This is the interactive JB Api documentation')
    .setVersion('2.0.0')
    .addTag('JuanBreath Contact Tracing AppModule')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
