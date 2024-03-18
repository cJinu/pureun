import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Pot } from '../pot/pot.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  device_id:number;

  @Column({length:36, nullable: true })
  serial_number: string;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  empty_FG: boolean;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({name:'user_id'})
  user: User;

  @Column({ nullable: true })
  user_id: number

  @Column({ length:50 , nullable: true, default: null})
  client_id: string

  @OneToOne(() => Pot)
  @JoinColumn({ name: 'pot_id' })
  pot: Pot;

  @Column({type: 'int', nullable: true})
  pot_id: number;

  @Column({type: 'varchar', nullable: true})
  device_name: string;
}
