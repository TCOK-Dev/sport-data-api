import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasketballGameService } from './basketball-game.service';
import { CreateBasketballGameDto } from './dto/create-basketball-game.dto';
import { UpdateBasketballGameDto } from './dto/update-basketball-game.dto';

@Controller('basketball-game')
export class BasketballGameController {
  constructor(private readonly basketballGameService: BasketballGameService) {}

  @Post()
  create(@Body() createBasketballGameDto: CreateBasketballGameDto) {
    return this.basketballGameService.create(createBasketballGameDto);
  }

  @Get()
  findAll() {
    return this.basketballGameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketballGameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketballGameDto: UpdateBasketballGameDto) {
    return this.basketballGameService.update(+id, updateBasketballGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketballGameService.remove(+id);
  }
}
