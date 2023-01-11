import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BasketballGameScore {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  quarter: string;

  @Field(() => Number, { nullable: true })
  clock: number;

  @Field(() => String, { nullable: true })
  awayTeam: string;

  @Field(() => String, { nullable: true })
  homeTeam: string;

  @Field(() => Number, { nullable: true })
  awayScore: number;

  @Field(() => Number, { nullable: true })
  homeScore: number;

  @Field(() => String, { nullable: true })
  awaySpread: string;

  @Field(() => String, { nullable: true })
  homeSpread: string;

  @Field(() => String, { nullable: true })
  awayOverUnder: string;

  @Field(() => String, { nullable: true })
  homeOverUnder: string;
}
