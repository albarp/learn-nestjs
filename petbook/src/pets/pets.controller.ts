import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  /*Query,
  Req,*/
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { CreatePetDto } from './dto/create-pet.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PetsService } from './pets.service';
import { Pet } from './interfaces/pet.interface';
import { PetMapper } from './pet.mapper';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get()
  // eslint-disable-next-line prettier/prettier
  findAll( /*@Req() request: Request,
    @Query('type') type: string,
    @Query('age') age: number,*/
  // eslint-disable-next-line prettier/prettier
  ): Pet[] {
    return this.petsService.findAll();
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
  create(@Body() createPetDto: CreatePetDto) {
    this.petsService.create(PetMapper.toDomain(createPetDto));
  }

  /*@Get()
  findAllPlatformSpecific(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK); // access platform (Express/Fastify) objects, not recomended
    return [];
  }*/
}
