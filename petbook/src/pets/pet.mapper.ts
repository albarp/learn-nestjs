import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './interfaces/pet.interface';

export class PetMapper {
  public static toDomain(dto: CreatePetDto): Pet {
    return {
      id: null,
      name: dto.name,
      age: dto.age,
      type: dto.type,
    };
  }
}
