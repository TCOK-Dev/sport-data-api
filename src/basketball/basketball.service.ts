import { Injectable } from '@nestjs/common';
import { CreateBasketballDto } from './dto/create-basketball.dto';
import { UpdateBasketballDto } from './dto/update-basketball.dto';

@Injectable()
export class BasketballService {
  create(createBasketballDto: CreateBasketballDto) {
    return 'This action adds a new basketball';
  }

  findAll() {
    return `This action returns all basketball`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketball`;
  }

  update(id: number, updateBasketballDto: UpdateBasketballDto) {
    return `This action updates a #${id} basketball`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketball`;
  }
}
