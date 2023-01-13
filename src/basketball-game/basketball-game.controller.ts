import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasketballGameService } from './basketball-game.service';
import { CreateBasketballGameDto } from './dto/create-basketball-game.dto';
import { UpdateBasketballGameDto } from './dto/update-basketball-game.dto';

@Controller('basketball-game')
export class BasketballGameController {
  constructor(private readonly basketballGameService: BasketballGameService) {}

  @Post()
  async create(@Body() createBasketballGameDto: CreateBasketballGameDto) {
    return await this.basketballGameService.create(createBasketballGameDto);
  }

  @Get()
  async findAll() {
    return await this.basketballGameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.basketballGameService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBasketballGameDto: UpdateBasketballGameDto,
  ) {
    return await this.basketballGameService.update(
      +id,
      updateBasketballGameDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.basketballGameService.remove(+id);
  }
}
