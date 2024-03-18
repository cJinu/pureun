import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pot } from '../pot/pot.entity';

@Entity()
export class PotState {
  @PrimaryGeneratedColumn()
  pot_state_id: number;

  @Column({ type: 'double', nullable: true })
  data: number;

  @Column({ type: 'tinyint', nullable: false })
  isTemp_FG: boolean
  
  @ManyToOne(() => Pot)
  @JoinColumn({name: 'pot_id'})
  pot: Pot;

  @Column({ type: 'int', nullable: false })
  pot_id: number;
  
  @CreateDateColumn()
  measure_DT: Date;
}
