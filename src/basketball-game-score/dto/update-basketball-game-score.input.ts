import { CreateBasketballGameScoreInput } from './create-basketball-game-score.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBasketballGameScoreInput extends PartialType(CreateBasketballGameScoreInput) {
  @Field(() => Int)
  id: number;
}
