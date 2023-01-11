import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasketballService } from './basketball.service';
import { CreateBasketballDto } from './dto/create-basketball.dto';
import { UpdateBasketballDto } from './dto/update-basketball.dto';

@Controller('basketball')
export class BasketballController {
  constructor(private readonly basketballService: BasketballService) {}

  @Post()
  create(@Body() createBasketballDto: CreateBasketballDto) {
    return this.basketballService.create(createBasketballDto);
  }

  @Get()
  findAll() {
    return this.basketballService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketballService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBasketballDto: UpdateBasketballDto,
  ) {
    return this.basketballService.update(+id, updateBasketballDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketballService.remove(+id);
  }
}
