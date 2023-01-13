import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasketballGameScoreService } from './basketball-game-score.service';
import { CreateBasketballGameScoreDto } from './dto/create-basketball-game-score.dto';
import { UpdateBasketballGameScoreDto } from './dto/update-basketball-game-score.dto';

@Controller('basketball-game-score')
export class BasketballGameScoreController {
  constructor(
    private readonly basketballGameScoreService: BasketballGameScoreService,
  ) {}

  @Post()
  async create(
    @Body() createBasketballGameScoreDto: CreateBasketballGameScoreDto,
  ) {
    return await this.basketballGameScoreService.create(
      createBasketballGameScoreDto,
    );
  }

  @Get()
  async findAll() {
    return await this.basketballGameScoreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.basketballGameScoreService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBasketballGameScoreDto: UpdateBasketballGameScoreDto,
  ) {
    return await this.basketballGameScoreService.update(
      +id,
      updateBasketballGameScoreDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.basketballGameScoreService.remove(+id);
  }
}
