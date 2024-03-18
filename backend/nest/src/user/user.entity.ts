import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Pot } from '../pot/pot.entity';
import { Talk } from 'src/talk/talk.entity';
import { UserLogin } from 'src/user-login/user-login.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(() => User, (user) => user.parent_id)
  user_id: number;

  @Column({ length: 10, nullable: false })
  nickname: string;

  @Column({ type: 'date', nullable: false })
  birth_DT: Date;

  @Column({ length: 1, nullable: false })
  gender: string;

  @Column({ length: 200, nullable: true, default: __dirname + "../upload/image/noImage.jpg"})
  profile_img_url: string;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({name:'parent_id'})
  parent: User;

  @Column({ nullable: true })
  parent_id: number

  @OneToMany(() => Pot, (pot) => pot.user)
  pots: Pot[];

  @OneToMany(() => Talk, talk => talk.talk_id)
  talk: Talk[];

  @OneToOne(() => UserLogin, userLogin => userLogin.user)
  userLogin: UserLogin;
}
