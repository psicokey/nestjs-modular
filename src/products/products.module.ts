import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsController } from './controllers/ brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { BrandsService } from './services/brands.services'; // Asegúrate que la ruta sea correcta
import { CategoriesService } from './services/categories.services'; // Asegúrate que la ruta sea correcta

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService], // 2. Agrega los otros servicios
  exports: [ProductsService, BrandsService, CategoriesService], // 3. Exporta los servicios para que otros módulos puedan usarlos
})
export class ProductsModule {}
