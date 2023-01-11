import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasketballGameInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
