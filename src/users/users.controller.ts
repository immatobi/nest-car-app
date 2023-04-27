import { Controller, Post, Body, Get, Put, Query, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto copy';

@Controller('users')
export class UsersController {

    constructor(private UserService: UsersService){

    }

    @Get('/')
    public async getUsers(@Query('limit') limit: string){
        const users = this.UserService.find();
        return users;
    }

    @Get('/:id')
    public async getUser(@Param('id') id: string){

        const user = this.UserService.findOne(id);

        if(!user){
            throw new Error('user does not exist')
        }

        return user;
    }


    @Post('/')
    public async createUser(@Body() body: CreateUserDto){

        const user = await this.UserService.create({
            email: body.email,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName
        })

        return user;

    }

    @Put('/:id')
    public async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){

        const { email, password, firstName, lastName } = body;

        const user = await this.UserService.findOne(id);
        
        if(!user){
            throw new Error('user does not exist')
        }

        user.email = email ? email : user.email;
        user.password = password ? password : user.password;
        user.firstName = firstName ? firstName : user.firstName;
        user.lastName = lastName ? lastName : user.lastName;

        await this.UserService.update(user);
        return { message: 'successful' }

    }

    @Delete('/:id')
    public async deleteUser(@Param('id') id: string){

        const user = await this.UserService.findOne(id);

        if(!user){
            throw new Error('user does not exist')
        }

        await this.UserService.remove(user);

        return 'succesful'

    }

}
