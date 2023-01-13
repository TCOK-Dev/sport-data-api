import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBasketballGameScoreDto } from './dto/create-basketball-game-score.dto';
import { UpdateBasketballGameScoreDto } from './dto/update-basketball-game-score.dto';
import { BasketballGameScore } from './entities/basketball-game-score.entity';

@Injectable()
export class BasketballGameScoreService {
  private readonly logger = new Logger(BasketballGameScoreService.name);

  constructor(
    @InjectRepository(BasketballGameScore)
    private readonly repository: Repository<BasketballGameScore>,
  ) {}

  async create(createBasketballGameScoreDto: CreateBasketballGameScoreDto) {
    this.logger.log('This action adds a new basketballGameScore');
    return await this.repository.save(createBasketballGameScoreDto);
  }

  async findAll() {
    this.logger.log(`This action returns all basketballGameScore`);
    return await this.repository.find();
  }

  async findOne(id: number) {
    this.logger.log(`This action returns a #${id} basketballGameScore`);
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateBasketballGameScoreDto: UpdateBasketballGameScoreDto,
  ) {
    this.logger.log(`This action updates a #${id} basketballGameScore`);
    return await this.repository.update(id, updateBasketballGameScoreDto);
  }

  async remove(id: number) {
    this.logger.log(`This action removes a #${id} basketballGameScore`);
    return await this.repository.delete(id);
  }
}
