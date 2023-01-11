import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BasketballGame } from 'src/basketball-game/entities/basketball-game.entity';

@ObjectType()
export class Basketball {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => [BasketballGame], { nullable: true })
  games: BasketballGame[];
}
