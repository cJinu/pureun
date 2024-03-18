import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Pot } from '../pot/pot.entity';

@Entity()
export class Calender {
  @PrimaryGeneratedColumn()
  calender_id: number;

  @CreateDateColumn()
  createdAt: Date;

  // W: 물준 날, T: 대화한 날
  @Column({ length: 1, nullable: false })
  code: string;
  
  @Column()
  pot_id: number;

  @ManyToOne(() => Pot, pot => pot.pot_id, {onDelete:'CASCADE', onUpdate:'CASCADE'})
  @JoinColumn({name: 'pot_id'})
  pot: Pot;

}
