import { Entity, PrimaryGeneratedColumn, Column, Double } from 'typeorm';

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  species_id: number;

  @Column({ length: 20, nullable: false })
  species_name: string;

  @Column({type: 'double', nullable: true})
  min_temperature: number

  @Column({type: 'double', nullable: true})
  max_temperature: number

  @Column({type: 'double', nullable: true})
  min_moisture: number

  @Column({type: 'double', nullable: true})
  max_moisture: number

}
