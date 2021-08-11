import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Product, CreateProductInput, UpdateProductInput } from '../schema/products';
import { ProductService } from '../database/services/productService';

@Service()
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { nullable: true })
  async getProducts(
    @Arg('sorting', {nullable: true})  inputParameter: "name" | "createdAt",
    @Arg('direction', {nullable: true, defaultValue: "ASC"}) inputDirection: "ASC" | "DESC",
    @Arg('offset', {nullable: true, defaultValue: 0}) skip: number,
    @Arg('limit', {nullable: true, defaultValue: 0}) take: number
    ): Promise<Product[]> {
    return this.productService.getAll({parameter: inputParameter, direction: inputDirection}, skip, take);
  }

  @Query(() => Product, { nullable: true })
  async getProduct(@Arg('id') id: number): Promise<Product | undefined> {
    return this.productService.getOne(id);
  }

  @Mutation(() => Product)
  async addProduct(
    @Arg('ProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('id') id: number,
    @Arg('ProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: number): Promise<boolean> {
    return this.productService.delete(id);
  }
}