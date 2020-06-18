import { Controller, Get, Post, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}

@Controller('cats')
export class CatsController {
  @Get('ss')
  findAll(): string {
    return 'This action returns all cats';
  }
  @Get('rr')
  @Redirect('https://nestjs.com', 301)

  @Post()
  @HttpCode(200)
  create(): string {
    return 'This action adds a new cat POST';
  }
}

