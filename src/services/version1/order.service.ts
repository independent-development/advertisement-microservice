import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(CommodityEntity) private commodity_table,
  ) {}

  async create(commodity_id, user_id) {
    const { order_id } = await this.order_table.insert({
      user_id,
      fk_commodity_id: commodity_id,
    });
    return order_id;
  }
}
