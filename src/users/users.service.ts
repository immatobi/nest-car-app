import { Injectable } from '@nestjs/common';
import { IUserDoc } from 'src/utils/interfaces.util';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') public User: Model<IUserDoc>){}

    /**
     * @name find
     * @description find all users in the db
     * @returns {Array<IUserDoc>} Array<IUserDoc>
     */
    public async find(): Promise<Array<IUserDoc>>{
        const users = await this.User.find({})
        return users;
    }

    /**
     * @name findOne
     * @description find a user in DB
     * @param id 
     * @returns {Promise<IUserDoc | null>} IUserDoc | null
     */
    public async findOne(id: string): Promise<IUserDoc | null>{

        const user = await this.User.findOne({ _id: id });
        return user ? user : null;

    }

    /**
     * @name create
     * @description create a new user
     * @param data 
     * @returns {Promise<IUserDoc>} IUserDoc
     */
    public async create(data: Partial<{ email: string, password: string, firstName: string, lastName: string}>): Promise<IUserDoc>{

        const user = await this.User.create({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName
        })

        return user;

    }

    /**
     * @name update
     * @description update user in DB
     * @param user 
     * @returns void
     */
    public async update(user: IUserDoc): Promise<void>{
        await user.save();
    }

    /**
     * @name remove
     * @description remove user from DB (permanently)
     * @param user 
     * @returns void
     */
    public async remove(user: IUserDoc): Promise<void>{
        await this.User.deleteOne({ _id: user._id })
    }


}
