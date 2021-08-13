import { Service } from 'typedi';
import { Tag } from '../entity/Tag';
import { CreateTagInput, UpdateTagInput } from '../../schema/tags';

interface Sorting {
  parameter: "name",
  direction: "ASC" | "DESC"
}

@Service()
export class TagService {
  getAll = async (sorting? : Sorting, skip?: number, take?: number): Promise<Tag[]> => {
    let pagination = {
      ...skip && { skip: skip },
      ...take && { take: take },
    }
    if (sorting?.parameter === "name") {
      return Tag.find({order: {name : sorting.direction}, skip, take});
    }
    if (skip || take) {
      return Tag.find(pagination);
    }

    return Tag.find();
  };


  create = async (createTagInput: CreateTagInput): Promise<Tag> => {
    return Tag.create(createTagInput).save();
  };

  update = async (
    id: number,
    updateTagInput: UpdateTagInput,
  ): Promise<Tag> => {
    const tagFound = await Tag.findOne({ where: { id } });

    if (!tagFound) {
      throw new Error(`The tag with id: ${id} does not exist!`);
    }

    Object.assign(tagFound, updateTagInput);
    const updatedTag = tagFound.save();

    return updatedTag;
  };

  delete = async (id: number): Promise<boolean> => {
    const tagFound = await Tag.findOne({ where: { id } });

    if (!tagFound) {
      throw new Error(`The tag with id: ${id} does not exist!`);
    }

    await tagFound.remove();

    return true;
  };
}