import { Injectable } from '@nestjs/common';
import { CreateBasketballGameDto } from './dto/create-basketball-game.dto';
import { UpdateBasketballGameDto } from './dto/update-basketball-game.dto';

@Injectable()
export class BasketballGameService {
  create(createBasketballGameDto: CreateBasketballGameDto) {
    return 'This action adds a new basketballGame';
  }

  findAll() {
    return `This action returns all basketballGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketballGame`;
  }

  update(id: number, updateBasketballGameDto: UpdateBasketballGameDto) {
    return `This action updates a #${id} basketballGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketballGame`;
  }
}
