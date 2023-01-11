import { Injectable } from '@nestjs/common';
import { CreateBasketballGameInput } from './dto/create-basketball-game.input';
import { UpdateBasketballGameInput } from './dto/update-basketball-game.input';

@Injectable()
export class BasketballGameService {
  create(createBasketballGameInput: CreateBasketballGameInput) {
    return 'This action adds a new basketballGame';
  }

  findAll() {
    return `This action returns all basketballGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketballGame`;
  }

  update(id: number, updateBasketballGameInput: UpdateBasketballGameInput) {
    return `This action updates a #${id} basketballGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketballGame`;
  }
}
