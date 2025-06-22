import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { CreatePetDto } from './dto/create-pet.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('pets')
export class PetsController {
  @Get()
  findAll(
    @Req() request: Request,
    @Query('type') type: string,
    @Query('age') age: number,
  ): string {
    return `This action returns all cats for path: ${request.path} with type: ${type} and age: ${age}`;
  }

  @Get('error')
  throwErrorr() {
    // throw new HttpException({ msg: 'custom message' }, HttpStatus.FORBIDDEN);
    throw new HttpException('message', HttpStatus.FORBIDDEN);
  }

  @Get('filterError')
  @UseFilters(HttpExceptionFilter) // It can be at action, controller or global level
  filterError() {
    // this is ignore as the response mmessage is built by the HttpExceptionFilter
    throw new HttpException('message', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `this action returns pet # ${id}`;
  }

  @Post()
  @HttpCode(201) // the default
  create(@Body() createPetDto: CreatePetDto): string {
    return `this creates a pet ${createPetDto.name}`;
  }

  /*@Get()
  findAllPlatformSpecific(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK); // access platform (Express/Fastify) objects, not recomended
    return [];
  }*/
}
