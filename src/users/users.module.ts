import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema } from '../models/User.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User', schema: UserSchema
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
