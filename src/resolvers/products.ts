import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Product, CreateProductInput, UpdateProductInput } from '../schema/products';
import { ProductService } from '../database/services/productService';

@Service()
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { nullable: true })
  async getProducts(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Query(() => Product, { nullable: true })
  async getProduct(@Arg('id') id: number): Promise<Product | undefined> {
    return await this.productService.getOne(id);
  }

  @Mutation(() => Product)
  async addProduct(
    @Arg('ProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('id') id: number,
    @Arg('ProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return await this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: number): Promise<boolean> {
    return await this.productService.delete(id);
  }
}