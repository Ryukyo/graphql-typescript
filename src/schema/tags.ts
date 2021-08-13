import { Field, ObjectType, InputType } from 'type-graphql';
import { Length } from 'class-validator';


@ObjectType()
@InputType("TagInput")
export class Tag {
  @Field({nullable: true})
  id!: number;

  @Field()
  name!: string;
}

@InputType()
export class CreateTagInput implements Partial<Tag> {
  @Field()
  @Length(2, 50)
  name!: string;
}

@InputType()
export class UpdateTagInput implements Partial<Tag> {
  @Field({ nullable: true })
  @Length(2, 50)
  name?: string;
}