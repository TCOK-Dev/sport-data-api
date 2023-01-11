import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketballGameDto } from './create-basketball-game.dto';

export class UpdateBasketballGameDto extends PartialType(CreateBasketballGameDto) {}
