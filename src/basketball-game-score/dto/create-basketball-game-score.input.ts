import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasketballGameScoreInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
