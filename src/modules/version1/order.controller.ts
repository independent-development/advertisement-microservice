import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Request, Post } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";
import { PostionService } from "@/services/version1/position.services";

import { PostionEntity } from "@/providers/position_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

/** 商品控制器 **/
@Controller("/order/v1/")
export class OrderController {
  constructor(
    private readonly auth: AuthService,
    private readonly position: PostionService,
    @InjectRepository(PostionEntity) private position_table,
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

  @Post("create")
  async create_order(@Request() request) {
    const position_info = request.body;
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    /** 创建订单 **/
    const create_order = await this.order_table.create({ user_id });

    /** 创建广告位 **/
    const create_position = await this.position.create(position_info, user_id);

    /** 建立关系映射 **/
    create_position.relation_order = create_order;
    create_order.relation_position = [create_position];

    /*  prettier-ignore */
    const save_order = await this.order_table.save(create_order);
    /*  prettier-ignore */
    const save_position = await this.position_table.save(create_position);

    return {
      save_order_id: save_order.order_id,
      save_position_id: save_position.position_id,
    };
  }
}
