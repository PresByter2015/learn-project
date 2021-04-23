import { Controller, Get, Post, HttpCode, UploadedFile, Param, Body, Header } from '@nestjs/common';
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
  @Get('do')
  @HttpCode(200)
  @Header("Access-Control-Allow-Origin", "*")
  @Header("Access-Control-Allow-Headers", "content-type")
  async setPost(@Body() params) {
    console.log(params);

    const data = {
      status: 200,
      msg: '成功',
      data: 'do post 请求成功'
    }
    setTimeout(() => {
      return data;
    }, 5000)
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
  async findOne() {
    const data = {
      status: 200,
      msg: '成功1',
      data: 'dG9rZW4tdGVzdA=='
    }
    // setTimeout(() => {
    // }, 5000)
    await new Promise(r => setTimeout(r, 15000));
    return data;
  }
  @Get('long')
  async findAllS(): Promise<any> {
    await new Promise(r => setTimeout(r, 1000));
    return { id: "www" }
  }
  // @Get('rr')
  // @Redirect('https://nestjs.com', 301)

  @Post('dd')
  @HttpCode(200)
  async setPost1(@Body() params) {
    console.log('dd', params);
    await new Promise(r => setTimeout(r, 28000));
    const data = {
      status: 200,
      msg: '成功',
      data: 'dd post 请求成功1'
    }
    return data;
  }

  @Post('form')
  @HttpCode(200)
  async setPost2(@UploadedFile() file, @Body() params) {
    console.log('file', file, params);

    const data = {
      status: 200,
      msg: '成功',
      data: 'dd post 请求成功'
    }
    return data;
  }
}

