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

  findAll(type: string, age: number): Pet[] {
    console.log(type);
    console.log(age);
    return this.pets;
  }

  findOne(id: number): Pet | undefined {
    return this.pets.find((p) => p.id === id);
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
