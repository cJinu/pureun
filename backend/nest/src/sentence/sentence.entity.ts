import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Talk } from '../talk/talk.entity';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  sentence_id: number;

  @Column({ length: 400, nullable: false })
  content: string;

  @Column({ length: 100, nullable: false })
  audio: string;

  @CreateDateColumn()
  sentence_DTN: Date;

  @Column({ length: 4, nullable: false })
  talker: string;

  @ManyToOne(() => Talk, talk => talk.talk_id)
  @JoinColumn({name: 'talk_id'})
  talk: Talk;

  @Column({type: 'int', nullable: false})
  talk_id: number;

  // Other columns and relationships can be added as needed.
}
