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
} from '@nestjs/common';
import { Request } from 'express';
import { CreatePetDto } from './dto/create-pet.dto';

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
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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
