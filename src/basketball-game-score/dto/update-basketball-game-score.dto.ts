import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketballGameScoreDto } from './create-basketball-game-score.dto';

export class UpdateBasketballGameScoreDto extends PartialType(
  CreateBasketballGameScoreDto,
) {}
