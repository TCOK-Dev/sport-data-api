import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BasketballService } from './basketball.service';
import { CreateBasketballDto } from './dto/create-basketball.dto';
import { UpdateBasketballDto } from './dto/update-basketball.dto';

@Controller('basketball')
export class BasketballController {
  constructor(private readonly basketballService: BasketballService) {}

  @Post()
  async create(@Body() createBasketballDto: CreateBasketballDto) {
    return await this.basketballService.create(createBasketballDto);
  }

  @Get()
  async findAll() {
    return await this.basketballService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.basketballService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBasketballDto: UpdateBasketballDto,
  ) {
    return await this.basketballService.update(+id, updateBasketballDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.basketballService.remove(+id);
  }
}
