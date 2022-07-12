import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Request } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";
import { PostionService } from "@/services/version1/position.services";

import { OrderRecordEntity } from "@/providers/order_record.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record.providers";
import { RandomMessagePostionEntity } from "@/providers/random_message_position.providers";

/** 商品控制器 **/
@Controller("/order/v1/")
export class OrderController {
  constructor(
    private readonly auth: AuthService,
    private readonly position: PostionService,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
    /* prettier-ignore */
    @InjectRepository(RandomMessagePostionEntity) private random_message_position_table,
  ) {}

  @Get("list")
  async list_all_order(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.order_table.find({
      relations: [
        "relation_banner_fixed_position",
        "relation_random_message_position",
      ],
      where: { user_id },
    });
    return result;
  }

  @Get("detail")
  async get_order_detail(@Request() request) {
    const { order_id } = request.query;
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.order_table.findOne({
      where: { order_id, user_id },
      relations: [
        "relation_banner_fixed_position",
        "relation_random_message_position",
      ],
    });
    return result;
  }
}
