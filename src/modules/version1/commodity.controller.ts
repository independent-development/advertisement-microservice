import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Request, Post } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

import get_calculate_computed_date from "@/utils/get_calculate_computed_date";

/** 商品控制器 **/
@Controller("/v1/commodity/")
export class CommodityController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(CommodityEntity) private commodity_table,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
  ) {}

  @Get("list")
  async list_all_commodity(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.commodity_table.find({
      relations: ["relation_order"],
      where: { user_id, active_status: "ACTIVE" },
      // join: {
      //   alias: "relation_commodity",
      //   leftJoinAndSelect: {
      //     "relation_commodity.order_id": "order_id",
      //   },
      // },
    });
    return result;
  }

  @Post("create")
  async create_commodity(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    /*  prettier-ignore */
    const {calculate_type,calculate_value,subject_detail_page,...otherRequest_body} = request.body;
    /*  prettier-ignore */
    const calculate_computed_date = get_calculate_computed_date(calculate_type,calculate_value);

    /** 创建广告 **/
    const create_commodity = await this.commodity_table.create({
      subject_detail_page: subject_detail_page.join("/"),
      calculate_computed_date,
      ...otherRequest_body,
      user_id,
    });

    /** 创建订单 **/
    const create_order = await this.order_table.create({ user_id });

    create_commodity.relation_order = create_order;
    create_order.relation_commodity = create_commodity;

    const save_commodity = await this.commodity_table.save(create_commodity);
    const save_order = await this.order_table.save(create_order);

    return {
      save_commodity_id: save_commodity.commodity_id,
      save_order_id: save_order.order_id,
    };
  }

  @Post("delete")
  async delete_commodity(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { commodity_id } = request.body;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    /*  prettier-ignore */
    /*  prettier-ignore */
    await this.commodity_table.delete({commodity_id,user_id});
    return true;
  }
}
