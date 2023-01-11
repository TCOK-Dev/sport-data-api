import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasketballGameScoreService } from './basketball-game-score.service';
import { BasketballGameScore } from './entities/basketball-game-score.entity';
import { CreateBasketballGameScoreInput } from './dto/create-basketball-game-score.input';
import { UpdateBasketballGameScoreInput } from './dto/update-basketball-game-score.input';

@Resolver(() => BasketballGameScore)
export class BasketballGameScoreResolver {
  constructor(private readonly basketballGameScoreService: BasketballGameScoreService) {}

  @Mutation(() => BasketballGameScore)
  createBasketballGameScore(@Args('createBasketballGameScoreInput') createBasketballGameScoreInput: CreateBasketballGameScoreInput) {
    return this.basketballGameScoreService.create(createBasketballGameScoreInput);
  }

  @Query(() => [BasketballGameScore], { name: 'basketballGameScore' })
  findAll() {
    return this.basketballGameScoreService.findAll();
  }

  @Query(() => BasketballGameScore, { name: 'basketballGameScore' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.basketballGameScoreService.findOne(id);
  }

  @Mutation(() => BasketballGameScore)
  updateBasketballGameScore(@Args('updateBasketballGameScoreInput') updateBasketballGameScoreInput: UpdateBasketballGameScoreInput) {
    return this.basketballGameScoreService.update(updateBasketballGameScoreInput.id, updateBasketballGameScoreInput);
  }

  @Mutation(() => BasketballGameScore)
  removeBasketballGameScore(@Args('id', { type: () => Int }) id: number) {
    return this.basketballGameScoreService.remove(id);
  }
}
