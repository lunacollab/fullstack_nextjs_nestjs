import { Controller, Post, Request, UseGuards,Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
    ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }
  
  @Get('mail')
  @Public()
  testMail() {
     this.mailerService
      .sendMail({
        to: 'j4flmao@gmail.com', 
        subject: 'Testing Nest MailerModule ✔', 
        text: 'welcome', 
        template:"register",
        context:{
          name:"Gin",
          activationCode:12222,
        } 
      })
  }

}
