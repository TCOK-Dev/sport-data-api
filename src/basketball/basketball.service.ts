import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBasketballDto } from './dto/create-basketball.dto';
import { UpdateBasketballDto } from './dto/update-basketball.dto';
import { Basketball } from './entities/basketball.entity';

@Injectable()
export class BasketballService {
  constructor(
    @InjectRepository(Basketball)
    private readonly basketballRepository: Repository<Basketball>,
  ) {}

  create(data: CreateBasketballDto) {
    return 'This action adds a new basketball';
  }

  async save(data: CreateBasketballDto) {
    return '';
  }

  async multiSave(data: CreateBasketballDto[]) {
    const leagues = await this.basketballRepository
      .createQueryBuilder()
      .insert()
      .into(Basketball)
      .values(data)
      .orUpdate(['title'], ['title'])
      .execute();
    return leagues;
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
