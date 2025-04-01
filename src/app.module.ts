import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './presentation/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domain/user/user.module';
import { UserController } from './domain/user/user.controller';
import { User } from './domain/user/User.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'guilherme10!',
      database: process.env.DATABASE_NAME || 'projetonest',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
