import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasketballGameScoreService } from './basketball-game-score.service';
import { CreateBasketballGameScoreDto } from './dto/create-basketball-game-score.dto';
import { UpdateBasketballGameScoreDto } from './dto/update-basketball-game-score.dto';

@Controller('basketball-game-score')
export class BasketballGameScoreController {
  constructor(private readonly basketballGameScoreService: BasketballGameScoreService) {}

  @Post()
  create(@Body() createBasketballGameScoreDto: CreateBasketballGameScoreDto) {
    return this.basketballGameScoreService.create(createBasketballGameScoreDto);
  }

  @Get()
  findAll() {
    return this.basketballGameScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketballGameScoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketballGameScoreDto: UpdateBasketballGameScoreDto) {
    return this.basketballGameScoreService.update(+id, updateBasketballGameScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketballGameScoreService.remove(+id);
  }
}
