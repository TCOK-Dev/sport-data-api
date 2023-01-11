import { IsEmail } from 'class-validator';
import { BasketballGame } from 'src/basketball-game/entities/basketball-game.entity';

export class CreateBasketballDto {
  @IsEmail()
  title: string;

  games: BasketballGame[];
}
