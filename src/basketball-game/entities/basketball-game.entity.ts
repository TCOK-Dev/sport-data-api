import { BasketballGameScore } from 'src/basketball-game-score/entities/basketball-game-score.entity';
import { Basketball } from 'src/basketball/entities/basketball.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class BasketballGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  quarter: string;

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
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

  @ManyToOne(() => Basketball, (score) => score.games)
  league: Basketball;

  @OneToMany(() => BasketballGameScore, (score) => score.game)
  scores: BasketballGameScore[];
}
