import { Injectable } from '@nestjs/common';
import { CreateBasketballInput } from './dto/create-basketball.input';
import { UpdateBasketballInput } from './dto/update-basketball.input';

@Injectable()
export class BasketballService {
  create(createBasketballInput: CreateBasketballInput) {
    return 'This action adds a new basketball';
  }

  findAll() {
    return `This action returns all basketball`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketball`;
  }

  update(id: number, updateBasketballInput: UpdateBasketballInput) {
    return `This action updates a #${id} basketball`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketball`;
  }
}
