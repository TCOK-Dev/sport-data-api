import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasketballGameService } from './basketball-game.service';
import { BasketballGame } from './entities/basketball-game.entity';
import { CreateBasketballGameInput } from './dto/create-basketball-game.input';
import { UpdateBasketballGameInput } from './dto/update-basketball-game.input';

@Resolver(() => BasketballGame)
export class BasketballGameResolver {
  constructor(private readonly basketballGameService: BasketballGameService) {}

  @Mutation(() => BasketballGame)
  createBasketballGame(@Args('createBasketballGameInput') createBasketballGameInput: CreateBasketballGameInput) {
    return this.basketballGameService.create(createBasketballGameInput);
  }

  @Query(() => [BasketballGame], { name: 'basketballGame' })
  findAll() {
    return this.basketballGameService.findAll();
  }

  @Query(() => BasketballGame, { name: 'basketballGame' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.basketballGameService.findOne(id);
  }

  @Mutation(() => BasketballGame)
  updateBasketballGame(@Args('updateBasketballGameInput') updateBasketballGameInput: UpdateBasketballGameInput) {
    return this.basketballGameService.update(updateBasketballGameInput.id, updateBasketballGameInput);
  }

  @Mutation(() => BasketballGame)
  removeBasketballGame(@Args('id', { type: () => Int }) id: number) {
    return this.basketballGameService.remove(id);
  }
}
