import { Field, ObjectType, InputType } from 'type-graphql';
import { Length } from 'class-validator';


@ObjectType()
export class Product {
  @Field()
  id!: number;

  @Field()
  name!: string;


//   @Field({ type: () => [Tag]})
  @Field(() => [String])
  tags!: string[];


  @Field()
  createdAt!: Date;
}

@InputType()
export class CreateProductInput implements Partial<Product> {
  @Field()
  @Length(2, 50)
  name!: string;

  @Field(() => [String])
  tags!: string[];
}

@InputType()
export class UpdateProductInput implements Partial<Product> {
  @Field({ nullable: true })
  @Length(2, 50)
  name?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}