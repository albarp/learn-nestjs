import { Injectable } from '@nestjs/common';
import { Pet } from './interfaces/pet.interface';

@Injectable()
export class PetsService {
  private readonly pets: Pet[] = [];

  create(pet: Pet) {
    const nextId = this.getNextId();
    pet.id = nextId;
    this.pets.push(pet);
  }

  findAll(): Pet[] {
    return this.pets;
  }

  private getNextId(): number {
    const numericIds = this.pets
      .map((pet) => pet.id)
      .filter((id): id is number => id !== null);

    if (numericIds.length === 0) {
      return 1;
    }

    const maxId = Math.max(...numericIds);
    return maxId + 1;
  }
}
