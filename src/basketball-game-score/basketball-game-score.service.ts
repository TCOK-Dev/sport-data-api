import { Injectable } from '@nestjs/common';
import { CreateBasketballGameScoreDto } from './dto/create-basketball-game-score.dto';
import { UpdateBasketballGameScoreDto } from './dto/update-basketball-game-score.dto';

@Injectable()
export class BasketballGameScoreService {
  create(createBasketballGameScoreDto: CreateBasketballGameScoreDto) {
    return 'This action adds a new basketballGameScore';
  }

  findAll() {
    return `This action returns all basketballGameScore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketballGameScore`;
  }

  update(id: number, updateBasketballGameScoreDto: UpdateBasketballGameScoreDto) {
    return `This action updates a #${id} basketballGameScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketballGameScore`;
  }
}
