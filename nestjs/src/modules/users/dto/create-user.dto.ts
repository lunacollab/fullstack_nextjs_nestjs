import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({message: "Name must be not empty"})
    name: string;

    @IsNotEmpty({message: "Email must be not empty"})
    @IsEmail({},{message: "Invalid email message"})
    email: string;

    @IsNotEmpty({message: "Password must be not empty"})
    password: string;

    phone: string;
    address: string;
    image: string;
}
