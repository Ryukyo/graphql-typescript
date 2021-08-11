import { Service } from 'typedi';
import { Product } from '../entity/Product';
import { CreateProductInput, UpdateProductInput } from '../../schema/products';

@Service()
export class ProductService {
  getAll = async (): Promise<Product[]> => {
    return await Product.find();
  };

  getOne = async (id: number): Promise<Product | undefined> => {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error(`The product with id: ${id} does not exist!`);
    }
    return product;
  };

  create = async (createProductInput: CreateProductInput): Promise<Product> => {
    return await Product.create(createProductInput).save();
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
    const updatedProduct = await productFound.save();

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