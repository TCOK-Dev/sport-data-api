import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateBasketballGameDto } from './dto/create-basketball-game.dto';
import { UpdateBasketballGameDto } from './dto/update-basketball-game.dto';
import { BasketballGame } from './entities/basketball-game.entity';

@Injectable()
export class BasketballGameService {
  private readonly logger = new Logger(BasketballGameService.name);

  constructor(
    @InjectRepository(BasketballGame)
    private readonly repository: Repository<BasketballGame>,
  ) {}

  async create(createBasketballGameDto: CreateBasketballGameDto) {
    return await this.repository.save(createBasketballGameDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findLive() {
    const beforeSeconds = new Date();
    beforeSeconds.setSeconds(beforeSeconds.getSeconds() - 10);

    return await this.repository.find({
      where: { updatedAt: MoreThan(beforeSeconds) },
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, updateBasketballGameDto: UpdateBasketballGameDto) {
    return await this.repository.update(id, updateBasketballGameDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
