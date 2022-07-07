import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Request, Post } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";

import { PostionEntity } from "@/providers/position_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

import get_calculate_computed_date from "@/utils/get_calculate_computed_date";

/** 商品控制器 **/
@Controller("/v1/order/")
export class OrderController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(PostionEntity) private postion_table,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
  ) {}

  @Get("list")
  async list_all_order(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.order_table.find({
      relations: ["relation_transaction", "relation_position"],
      where: { user_id },
    });
    return result;
  }

  // @Get("detail")
  // async get_commodity_detail(@Request() request) {
  //   const { API_TOKEN } = request.cookies;
  //   const { commodity_id } = request.query;
  //   const { user_id } = await this.auth.get_user_info(API_TOKEN);
  //   const result = await this.commodity_table.findOneBy({
  //     commodity_id,
  //     user_id,
  //   });
  //   return result;
  // }

  @Post("create")
  async create_order(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    /*  prettier-ignore */
    const {calculate_type,calculate_value,subject_detail_page,...otherRequest_body} = request.body;
    /*  prettier-ignore */
    const calculate_computed_date = get_calculate_computed_date(calculate_type,calculate_value);

    /** 创建广告位 **/
    const create_position = await this.postion_table.create({
      subject_detail_page: subject_detail_page.join("/"),
      calculate_computed_date,
      ...otherRequest_body,
      calculate_type,
      calculate_value,
      user_id,
    });

    /** 创建订单 **/
    const create_order = await this.order_table.create({ user_id });

    /** 保存关系 **/
    create_position.relation_order = create_order;
    create_order.relation_position = [create_position];

    /*  prettier-ignore */
    const save_order = await this.order_table.save(create_order);
    /*  prettier-ignore */
    const save_position = await this.postion_table.save(create_position);

    return {
      save_order_id: save_order.order_id,
      save_position_id: save_position.position_id,
    };
  }
}
