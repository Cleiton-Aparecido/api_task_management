import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { PermissionModule } from './permission/permission.module';
import { UsersService } from './users/services/users.service';
import { UsersUseCase } from './users/services/users.usecase';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UsersModule,
    PermissionModule,
  ],
  providers: [
    {
      provide: UsersUseCase,
      useClass: UsersService,
    },
  ],
})
export class AppModule {}
