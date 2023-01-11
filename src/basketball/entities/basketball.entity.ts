import { BasketballGame } from 'src/basketball-game/entities/basketball-game.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Basketball {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @OneToMany((type) => BasketballGame, (game) => game.basketball)
  games: BasketballGame[];
}
