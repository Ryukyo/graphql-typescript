import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Tag, CreateTagInput, UpdateTagInput } from '../schema/tags';
import { TagService } from '../database/services/tagService';

@Service()
@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag], { nullable: true })
  async getTags(
    ): Promise<Tag[]> {
    return this.tagService.getAll();
  }

  @Mutation(() => Tag)
  async addTag(
    @Arg('TagInput') createTagInput: CreateTagInput,
  ): Promise<Tag> {
    return this.tagService.create(createTagInput);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg('id') id: number,
    @Arg('TagInput') updateTagInput: UpdateTagInput,
  ): Promise<Tag> {
    return this.tagService.update(id, updateTagInput);
  }

  @Mutation(() => Boolean)
  async deleteTag(@Arg('id') id: number): Promise<boolean> {
    return this.tagService.delete(id);
  }
}