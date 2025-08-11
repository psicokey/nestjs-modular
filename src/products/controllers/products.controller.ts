import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service'; // Asegúrate que el path es correcto
import { BrandsService } from '../services/brands.services';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand?: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productRepo.findOne({
      where: { id: productId },
      relations: ['brand'],
    });
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const product = await this.productRepo.findOneBy({ id });
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      product.brand = brand;
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productRepo.findOneBy({ id });
    return this.productRepo.remove(product);
  }
}
