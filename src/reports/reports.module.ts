import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ReportSchema } from '../models/Report.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Report', schema: ReportSchema
    }])
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
