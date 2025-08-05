import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>) {}

  async findAll() {
    return await this.brandsRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandsRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = this.brandsRepo.create(data);
    return await this.brandsRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandsRepo.merge(brand, changes);
    return await this.brandsRepo.save(brand);
  }

  async remove(id: number) {
    await this.findOne(id); // Asegura que la marca existe antes de intentar borrar
    return await this.brandsRepo.delete(id);
  }
}
