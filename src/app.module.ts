import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './presentation/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domain/user/user.module';
import { UserController } from './domain/user/user.controller';
import { User } from './domain/user/User.entity';
import { AuthModule } from './domain/auth/auth.module';
import { CategoryModule } from './domain/category/category.module';
import { CategoryController } from './domain/category/category.controller';
import { Category } from './domain/category/category.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Category],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [UserController, CategoryController],
})
export class AppModule {}
