import { Field, ObjectType, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import {Tag} from './tags'

@ObjectType()
export class Product {
  @Field()
  id!: number;

  @Field()
  name!: string;


  @Field(_TagInput => [Tag], {nullable: true})
  tags!: Tag[];


  @Field()
  createdAt!: Date;
}

@InputType()
export class CreateProductInput implements Partial<Product> {
  @Field()
  @Length(2, 50)
  name!: string;

  @Field(_type => [Tag], { nullable: true })
  tags?: Tag[];
}

@InputType()
export class UpdateProductInput implements Partial<Product> {
  @Field({ nullable: true })
  @Length(2, 50)
  name?: string;

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];
}