import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService, TestService, AuthService } from './app.service';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
    private readonly authService: AuthService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return this.testService.getTest();
  }

  @Post('register')
  async registerPassword(@Body('password') password: string) {
    const token = await this.authService.registerPassword(password);
    return { token };
  }
}

