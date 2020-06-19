import { Controller, Get, Post, HttpCode, Redirect, Param, Body } from '@nestjs/common';
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
  @Post('do')
  @HttpCode(200)
  async setPost(@Body() params) {
    console.log(params);

    const data = {
      status: 200,
      msg: '成功',
      data: 'do post 请求成功'
    }
    return data;
  }

  @Get('ss/:id')
  findAll(@Param() params) {
    // console.log(params);
    const data = {
      status: params.id === '1' ? -101 : 200,
      msg: params.id === '1' ? 'token 失效' : '成功',
      data: []
    }
    return data;
  }
  @Get('login')
  findOne() {
    const data = {
      status: 200,
      msg: '成功',
      data: 'dG9rZW4tdGVzdA=='
    }
    return data;
  }

  // @Get('rr')
  // @Redirect('https://nestjs.com', 301)

  @Post('dd')
  @HttpCode(200)
  async setPost1(@Body() params) {
    console.log('dd',params);
    
    const data = {
      status: 200,
      msg: '成功',
      data: 'dd post 请求成功'
    }
    return data;
  }
}

