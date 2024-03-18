import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.entity'; // 다른 엔터티에 따라 수정해야 합니다.
import { Calender } from 'src/calender/calender.entity';
import { Talk } from 'src/talk/talk.entity';

@Entity()
export class Pot {
  @PrimaryGeneratedColumn({type: 'int'})
  pot_id: number;

  @Column({ length: 10, nullable: false })
  pot_name: string;

  @Column({ length: 10, nullable: false })
  pot_species: string;

  @Column({ type: 'double', nullable: true })
  min_temperature: number;

  @Column({ type: 'double', nullable: true })
  max_temperature: number;

  @Column({ type: 'double', nullable: true })
  min_moisture: number;

  @Column({ type: 'double', nullable: true })
  max_moisture: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 200, nullable: false, default: 'noimage.png' })
  pot_img_url: string;
  
  @Column({ type: 'int', nullable: true, default: 0})
  happy_cnt: number;
  
  @Column({ type: 'tinyint', nullable: false, default: 0})
  collection_FG: boolean;
  
  @Column({type: 'int', nullable: true, default: 0, name: 'temperature'})
  temperature: number;
  
  @Column({type: 'int', nullable: true, default: 0, name: 'moisture'})
  moisture: number;
  
  @ManyToOne(() => User, (user) => user.pots, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})// 외래키 식별자로 사용될 컬럼명
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column({type: 'int', nullable: true})
  user_id: number;
  
  @OneToMany(() => Calender, calender => calender.pot)
  calender: Calender[];

  @OneToMany( () => Talk, talk => talk.pot)
  talk: Talk[]

  @Column({type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'planting_day'})
  planting_day: Date;

  @Column({type: Number, nullable: true, default: null})
  together_day: number;
}
