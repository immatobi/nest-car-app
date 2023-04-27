import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import errorHandler from 'src/middleware/error.mw';
import { config } from 'dotenv';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import LoggerMiddleware from 'src/middleware/logger.mw';
import * as mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import * as hpp from 'hpp';
import { NextFunction , Request, Response} from 'express';
import * as userAgent from 'express-useragent';

const initApp = async (): Promise<NestExpressApplication> => {

    // load env vars
    config()

    // create app
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });

    // set view engine
    app.setViewEngine('ejs');

    // cookie-parser
    app.use(cookieParser())

    // body-parser
    app.useBodyParser('json', { limit: '50mb' })
    app.useBodyParser('urlencoded', { limit: '50mb', extended: false })

    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'){
        // app.use(morgan('dev'))
        app.use(LoggerMiddleware)
    }

    // TODO: come back to set configuration for file upload

    // sanitize data for mongodb
    app.use(mongoSanitize())

    // set security headers ::: it adds more headers to request
    app.use(helmet())

    // prvent http parameter pollution
    app.use(hpp())

    // enable cors
    app.enableCors({ origin: true, credentials: true })

    // cors middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // set static folders
    app.useStaticAssets(join(__dirname, '..' ,'public'))
    app.setBaseViewsDir(join(__dirname, '..' ,'views'))

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true })
    )

    // user-agent
    app.use(userAgent.express())

    // mount-routers

    app.use(errorHandler)

    return app;

}

export default initApp;