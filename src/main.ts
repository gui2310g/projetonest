import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  const { doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'default-secret', 
    cookieName: 'x-csrf-token', 
    cookieOptions: {
      httpOnly: true, 
      sameSite: 'strict', 
      path: '/',
      secure: process.env.NODE_ENV === 'production', 
    },
    // getTokenFromRequest: (req) => req.headers['x-csrf-token'], 
  });
  app.use(doubleCsrfProtection); 
  */ 
  app.use(helmet());
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
