import { Injectable } from '@nestjs/common';
import { CreateBasketballGameScoreInput } from './dto/create-basketball-game-score.input';
import { UpdateBasketballGameScoreInput } from './dto/update-basketball-game-score.input';

@Injectable()
export class BasketballGameScoreService {
  create(createBasketballGameScoreInput: CreateBasketballGameScoreInput) {
    return 'This action adds a new basketballGameScore';
  }

  findAll() {
    return `This action returns all basketballGameScore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketballGameScore`;
  }

  update(id: number, updateBasketballGameScoreInput: UpdateBasketballGameScoreInput) {
    return `This action updates a #${id} basketballGameScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketballGameScore`;
  }
}
