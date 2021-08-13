import { Service } from 'typedi';
import { Product } from '../entity/Product';
import { CreateProductInput, UpdateProductInput } from '../../schema/products';
import { In } from "typeorm"

interface Sorting {
  parameter: "name" | "createdAt",
  direction: "ASC" | "DESC"
}

@Service()
export class ProductService {
  getAll = async (tag? : string, sorting? : Sorting, skip?: number, take?: number): Promise<Product[]> => {
    let pagination = {
      ...skip && { skip: skip },
      ...take && { take: take },
    }
    if (sorting?.parameter === "createdAt") {
      return Product.find({order: {createdAt : sorting.direction}, skip, take});
    } 
    if (sorting?.parameter === "name") {
      return Product.find({order: {name : sorting.direction}, skip, take});
    }
    if (skip || take) {
      return Product.find(pagination);
    }
    if (tag) {
      /* 
      In current version it returns an error about a malformed array literal.
      I would like to use a structure like the following:
      .createQueryBuilder("products")
      .where("products.tags = ANY ( :...tag )", { name: tag })
      but this causes TS to complain about over 25 missing properties for createQueryBuilder
      */
      return Product.find({where: {tags : In([tag])}})
    }
    return Product.find();
  };

  getOne = async (id: number): Promise<Product | undefined> => {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error(`The product with id: ${id} does not exist!`);
    }
    return product;
  };

  create = async (createProductInput: CreateProductInput): Promise<Product> => {
    return Product.create(createProductInput).save();
  };

  update = async (
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> => {
    const productFound = await Product.findOne({ where: { id } });

    if (!productFound) {
      throw new Error(`The product with id: ${id} does not exist!`);
    }

    Object.assign(productFound, updateProductInput);
    const updatedProduct = productFound.save();

    return updatedProduct;
  };

  delete = async (id: number): Promise<boolean> => {
    const productFound = await Product.findOne({ where: { id } });

    if (!productFound) {
      throw new Error(`The product with id: ${id} does not exist!`);
    }

    await productFound.remove();

    return true;
  };
}