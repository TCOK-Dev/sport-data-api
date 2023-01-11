import { IsEmail, IsOptional } from 'class-validator';
import { CreateBasketballGameDto } from 'src/basketball-game/dto/create-basketball-game.dto';

export class CreateBasketballDto {
  @IsEmail()
  title: string;

  @IsOptional()
  games: CreateBasketballGameDto[];
}
