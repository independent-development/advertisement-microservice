import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Request } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";

import { PostionEntity } from "@/providers/position_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

/** 商品控制器 **/
@Controller("/v1/position/")
export class PositionController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(PostionEntity) private postion_table,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
  ) {}

  @Get("list")
  async list_all_position(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.postion_table.find({
      where: { user_id },
    });
    return result;
  }

  @Get("detail")
  async get_position_detail(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { position_id } = request.query;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    /*  prettier-ignore */
    const result = await this.postion_table.findOneBy({position_id,user_id});
    return result;
  }
}
