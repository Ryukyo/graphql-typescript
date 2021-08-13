import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
  } from 'typeorm';

//   import {Tag} from './Tag'
  
  @Entity()
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column({ type: 'text', array: true })
    tags!: string[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  }