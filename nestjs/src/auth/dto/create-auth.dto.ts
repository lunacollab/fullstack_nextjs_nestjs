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

export class CodeAuthDto {
   @IsNotEmpty({message:"Id must be not empty"})
   _id: string;

   @IsNotEmpty({message:"Code must be not empty"}) 
   code: string;
}
