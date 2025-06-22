import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('pets')
export class PetsController {
  @Get()
  findAll(@Req() request: Request, @Query('type') type: string): string {
    return `This action returns all cats for path: ${request.path} and key: ${type}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `this action returns pet # ${id}`;
  }

  @Post()
  @HttpCode(201) // the default
  create(): string {
    return 'this creates a cat';
  }
}
