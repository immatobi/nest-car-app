import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  public getApp(@Res() res: Response) {
    
    res.status(200).json({
      error: false,
      errors: [],
      message: 'successful',
      data: {
          name: 'nest-car-api',
          version: '1.0.0'
      },
      status: 200
    })

  }
}
