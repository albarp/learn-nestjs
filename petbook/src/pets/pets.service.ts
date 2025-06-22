import { Injectable } from '@nestjs/common';
import { Pet } from './interfaces/pet.interface';

@Injectable()
export class PetsService {
  private readonly pets: Pet[] = [];

  create(pet: Pet) {
    this.pets.push(pet);
  }

  findAll(): Pet[] {
    return this.pets;
  }
}
