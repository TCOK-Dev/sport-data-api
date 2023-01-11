import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BasketballService } from './basketball.service';
import { CreateBasketballInput } from './dto/create-basketball.input';
import { UpdateBasketballInput } from './dto/update-basketball.input';
import { Basketball } from './entities/basketball.entity';

@Resolver(() => Basketball)
export class BasketballResolver {
  constructor(private readonly basketballService: BasketballService) {}

  @Mutation(() => Basketball)
  createBasketball(
    @Args('createBasketballInput') createBasketballInput: CreateBasketballInput,
  ) {
    return this.basketballService.create(createBasketballInput);
  }

  @Query(() => [Basketball], { name: 'basketball' })
  findAll() {
    return this.basketballService.findAll();
  }

  @Query(() => Basketball, { name: 'basketball' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.basketballService.findOne(id);
  }

  @Mutation(() => Basketball)
  updateBasketball(
    @Args('updateBasketballInput') updateBasketballInput: UpdateBasketballInput,
  ) {
    return this.basketballService.update(
      updateBasketballInput.id,
      updateBasketballInput,
    );
  }

  @Mutation(() => Basketball)
  removeBasketball(@Args('id', { type: () => Int }) id: number) {
    return this.basketballService.remove(id);
  }
}
