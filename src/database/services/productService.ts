import { Service } from 'typedi';
import { Product } from '../entity/Product';
import { CreateProductInput, UpdateProductInput } from '../../schema/products';

interface Sorting {
  parameter: "name" | "createdAt",
  direction: "ASC" | "DESC"
}

@Service()
export class ProductService {
  getAll = async (sorting? : Sorting): Promise<Product[]> => {
    if (sorting?.parameter === "createdAt") {
      return Product.find({order: {createdAt : sorting.direction}});
    } else if (sorting?.parameter === "name") {
      return Product.find({order: {name : sorting.direction}});
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