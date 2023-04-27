import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validateChannels } from './middleware/header.mw';
import { UsersController } from './users/users.controller';
import { ReportsController } from './reports/reports.controller';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule, 
    ReportsModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        autoIndex: true,
        keepAlive: true,
        maxPoolSize: 1000,
        wtimeoutMS:60000,
        connectTimeoutMS: 60000,
        socketTimeoutMS: 60000,
        serverSelectionTimeoutMS: 60000,
        family: 4,
        useUnifiedTopology: true

      })
    }),
    ThrottlerModule.forRoot({
      ttl: 24 * 60 * 60 * 1000, // 2h hrs in milliseconds
      limit: 30000
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard }
  ],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer){

    consumer
    .apply(validateChannels)
    .forRoutes(UsersController, ReportsController)

  }

}
