import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Request, Get, Post } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

@Controller("/v1/orders/")
export class OrdersController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(CommodityEntity) private commodity_record,
    @InjectRepository(TransactionRecordEntity) private transaction_record,
  ) {}

  @Get("list")
  async list(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.order_table.find({
      relations: ["relation_commodity"],
      where: { active_status: "ACTIVE", user_id },
    });
    return result;
  }

  @Post("create")
  async create(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const order_id = await this.order_table.insert({ user_id });
    return order_id;
  }

  @Post("delete")
  async delete(@Request() request) {
    const { order_id } = request.body;
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    await this.order_table.delete({ order_id, user_id });
    return order_id;
  }
}
