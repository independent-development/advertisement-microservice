import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Post, Request } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";

import { PostionEntity } from "@/providers/position_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

import get_calculate_computed_date from "@/utils/get_calculate_computed_date";

/** 商品控制器 **/
@Controller("/v1/position/")
export class PositionController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(PostionEntity) private position_table,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
  ) {}

  @Get("list")
  async list_all_position(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.position_table.find({
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
    const result = await this.position_table.findOneBy({position_id,user_id});
    return result;
  }

  @Post("update")
  async update_position(@Request() request) {
    /*  prettier-ignore */
    /** subject_detail_page(投放页面),position_value(投放位置)不允许修稿 **/
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {position_id,calculate_type,calculate_value,subject_detail_page,position_value,...position_info} = request.body;
    /*  prettier-ignore */
    const calculate_computed_date = get_calculate_computed_date(calculate_type,calculate_value);
    /*  prettier-ignore */
    await this.position_table.update(
      { position_id },
      {calculate_computed_date,calculate_type,calculate_value,...position_info},
    );
    return true;
  }
}
