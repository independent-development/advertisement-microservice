import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Post } from "@nestjs/common";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

@Controller("/v1/orders/")
export class OrdersController {
  constructor(
    @InjectRepository(OrderRecordEntity) private order_record,
    @InjectRepository(CommodityEntity) private commodity_record,
    @InjectRepository(TransactionRecordEntity) private transaction_record,
  ) {}

  @Get("list")
  async list() {
    const result = await this.order_record.find();
    return result;
  }

  @Post("create")
  async create() {
    // await this.orderRecordEntityRepository.insert({ user_id: 'test_user' });
    return true;
  }
}
