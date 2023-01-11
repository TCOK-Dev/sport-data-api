import { CreateBasketballGameInput } from './create-basketball-game.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBasketballGameInput extends PartialType(CreateBasketballGameInput) {
  @Field(() => Int)
  id: number;
}
