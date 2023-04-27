import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReportDoc } from 'src/utils/interfaces.util';

@Injectable()
export class ReportsService {

    constructor(@InjectModel('Report') private Report: Model<IReportDoc>){}

}
