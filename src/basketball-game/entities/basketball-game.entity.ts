import { BasketballGameScore } from 'src/basketball-game-score/entities/basketball-game-score.entity';
import { Basketball } from 'src/basketball/entities/basketball.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BasketballGame {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public finishAt: Date;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  quarter: string;

  @Column({ nullable: true })
  clock: number;

  @Column({ nullable: true })
  playedTime: number;

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
