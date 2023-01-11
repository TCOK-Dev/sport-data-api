import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateBasketballDto } from './dto/create-basketball.dto';
import { UpdateBasketballDto } from './dto/update-basketball.dto';
import { Basketball } from './entities/basketball.entity';

@Injectable()
export class BasketballService {
  constructor(private dataSource: DataSource) {}

  create(createBasketballDto: CreateBasketballDto) {
    return 'This action adds a new basketball';
  }

  async save(createBasketballDto: CreateBasketballDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const exist = await queryRunner.manager.findOne(Basketball, {
        where: { title: createBasketballDto.title },
      });

      if (exist) {
        return exist;
      }

      const row = await queryRunner.manager.insert(
        Basketball,
        createBasketballDto,
      );

      const ret: Basketball = row.generatedMaps[0] as Basketball;

      return ret;
    } catch (error) {}

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
