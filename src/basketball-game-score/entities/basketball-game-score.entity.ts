import { BasketballGame } from 'src/basketball-game/entities/basketball-game.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BasketballGameScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  quarter: string;

  @Column({ nullable: true })
  clock: number;

  @Column({ nullable: true })
  awayTeam: string;

  @Column({ nullable: true })
  homeTeam: string;

  @Column({ nullable: true })
  awayScore: number;

  @Column({ nullable: true })
  homeScore: number;

  @Column({ nullable: true })
  awaySpread: string;

  @Column({ nullable: true })
  homeSpread: string;

  @Column({ nullable: true })
  awayOverUnder: string;

  @Column({ nullable: true })
  homeOverUnder: string;

  @ManyToOne(() => BasketballGame, (game) => game.scores)
  game: BasketballGame;
}
