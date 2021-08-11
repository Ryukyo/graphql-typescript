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
  
    // @OneToMany(type => Tag, tag => tag.name)
    // @Column({ type: () => [Tag]})
    @Column({ type: 'text', array: true })
    tags!: string[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  }