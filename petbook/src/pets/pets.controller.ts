import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  /*Req,*/
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { CreatePetDto } from './dto/create-pet.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PetsService } from './pets.service';
import { Pet } from './interfaces/pet.interface';
import { PetMapper } from './pet.mapper';
import { ValidationPipe } from '../validation.pipe';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get()
  // eslint-disable-next-line prettier/prettier
  findAll( /*@Req() request: Request,*/
    @Query('type') type: string,
    @Query(
      'age',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    age: number,
  ): Pet[] {
    return this.petsService.findAll(type, age);
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
  findOne(@Param('id', ParseIntPipe) id: number): Pet {
    const pet = this.petsService.findOne(id);

    if (pet === undefined) {
      throw new HttpException(
        `pet with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return pet;
  }

  @Post()
  @HttpCode(201) // the default
  create(@Body(new ValidationPipe()) createPetDto: CreatePetDto) {
    this.petsService.create(PetMapper.toDomain(createPetDto));
  }

  /*@Get()
  findAllPlatformSpecific(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK); // access platform (Express/Fastify) objects, not recomended
    return [];
  }*/
}
