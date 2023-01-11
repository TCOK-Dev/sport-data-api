import { CreateBasketballInput } from './create-basketball.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBasketballInput extends PartialType(CreateBasketballInput) {
  @Field(() => Int)
  id: number;
}
