import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
export class CreateAuthDto {
   @IsNotEmpty({message:"Email must be not empty"})
   @IsEmail({},{message:"Invalid email"}) 
   email: string;

   @IsNotEmpty({message:"Password must be not empty"}) 
   password: string;
   
   @IsOptional()
   name:string;

}
