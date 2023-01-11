import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasketballInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
