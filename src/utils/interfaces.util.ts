import { Document, ObjectId } from 'mongoose';

export interface IUserDoc extends Document{

    firstName: string,
    lastName: string,
    username: string;
    email: string,
    password: string,
    slug: string;

    reports: Array<ObjectId | any>;

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: ObjectId;
    id: ObjectId;

    // functions
    getAll(): IUserDoc
}

export interface IReportDoc extends Document{

    price: string,
    slug: string

    user: ObjectId | any;

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: ObjectId;
    id: ObjectId;

    // functions
    getAll(): IReportDoc
}