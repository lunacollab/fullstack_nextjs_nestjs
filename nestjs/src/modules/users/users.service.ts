import { hashPasswordHelper } from '@/helpers/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import { CodeAuthDto, CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
 constructor(
     @InjectModel(User.name) 
     private userModel: Model<User>,
    
     private mailerService: MailerService
 ) {}
  
 isEmailExist =async(email:string) =>{
  const user = await this.userModel.exists({email});
  if(user)return true;
  return false;
 }

  async create(createUserDto: CreateUserDto) {
    const {name, email, password, phone, address,image} = createUserDto;
    if(await this.isEmailExist(email) === true){
      throw new BadRequestException(`Email: ${email} has already exists, please use a different email.`)
    }
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,email,password:hashPassword,phone, address
    });
    return{
      _id: user._id,
    }
  }

 async findAll(query: string,current:number,pageSize:number) {
   const {filter,sort} = aqp(query);
   if(filter.current) delete filter.current;
   if(filter.pageSize) delete filter.pageSize;

   if (!current) current = 1;
   if (!pageSize) pageSize = 10;

   const totalItems = (await this.userModel.find(filter)).length;
   const totalPages = Math.ceil(totalItems / pageSize);

   const skip = (current - 1)*(pageSize);

 
    const results = await this.userModel
    .find(filter)
    .limit(pageSize)
    .skip(skip)
    .select("-password")
    .sort(sort as any);

    return {results, totalPages};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({email});
  }

  async update( updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      {_id: updateUserDto._id}, {...updateUserDto});
  }

 async remove(_id: string) {
    if(mongoose.isValidObjectId(_id)){
     return this.userModel.deleteOne({_id})
    }else{
      throw new BadRequestException("Id is invalid");
    }
  }

  async handleRegister(registerDto:CreateAuthDto){
    const {email, password,name} = registerDto;
    if(await this.isEmailExist(email) === true){
      throw new BadRequestException(`Email: ${email} has already exists, please use a different email.`)
    }
    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,email,password:hashPassword, 
      isActive: false,
      codeId:codeId,
      codeExpired:dayjs().add(5, 'minutes')
    });
    this.mailerService
      .sendMail({
        to: user.email, 
        subject: 'Activate your account at @j4flmao', 
        template:"register",
        context:{
          name:user?.name ?? user.email,
          activationCode:codeId,
        } 
      }) 

    return{
      _id:user._id,
    }
  }

  async handleActive(data:CodeAuthDto){
     const user = await this.userModel.findOne({
      _id:data._id,
      codeId:data.code
     })
     if(!user){
      throw new BadRequestException(`Code invalid or expired`)
     }

     const isBeforeCheck = dayjs().isBefore(user.codeExpired)
     
     if (isBeforeCheck) {
        await this.userModel.updateOne({_id:data._id},{
          isActive:true
        })

       return {isBeforeCheck};
     }else{
       throw new BadRequestException(`Code invalid or expired`)
     }

   
  }
}
