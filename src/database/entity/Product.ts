import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToMany,
    JoinTable
  } from 'typeorm';
import {Tag} from './Tag'
  
  @Entity()
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @ManyToMany(() => Tag)
    @JoinTable()
    tags!: Tag[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  }