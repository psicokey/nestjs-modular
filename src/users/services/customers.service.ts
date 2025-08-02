import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    this.customerRepo.save(newCustomer);
    return newCustomer;
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    const index = await this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }
  remove(id: number) {
    if (!this.findOne(id))
      throw new NotFoundException(`Customer #${id} not found`);
    this.customerRepo.delete(id);
    return this.customerRepo.delete(id);
  }
}
