import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  async createOrder(customerId: number): Promise<Order> {
    const order = this.orderRepo.create({ customer: { id: customerId } });
    return this.orderRepo.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      if (!customer) {
        throw new Error('Customer not found');
      }
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.orderRepo.delete(id);
  }

  async updateOrder(
    id: number,
    changes: Partial<CreateOrderDto>,
  ): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      if (!customer) {
        throw new Error('Customer not found');
      }
      order.customer = customer;
    }
    return this.orderRepo.save({ ...order, ...changes });
  }
}
