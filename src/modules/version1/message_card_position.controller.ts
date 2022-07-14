import { DataSource } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Controller, Get, Post, Request } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";
import { AmountService } from "@/services/version1/amount.service";
import { PostionService } from "@/services/version1/position.services";

import { OrderRecordEntity } from "@/providers/order_record.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record.providers";
import { MessageCardPostionEntity } from "@/providers/message_card_position.providers";

/** 商品控制器 **/
@Controller("/message_card_position/v1/")
export class MessageCardPositionController {
  constructor(
    private readonly auth: AuthService,
    private readonly amount: AmountService,
    private readonly position: PostionService,
    private readonly dataSource: DataSource,
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
    /*  prettier-ignore */
    @InjectRepository(MessageCardPostionEntity) private message_card_position_table,
  ) {}

  /** 获取随机广告位的报价,按次计价,一次收费0.25美元 **/
  @Get("amount")
  async get_random_message_amount(@Request() request) {
    const { calculate_value } = request.query;
    return this.amount.random_message_amount(calculate_value);
  }

  /** 创建随机信息流广告位 **/
  @Post("create")
  async create_random_message_position(@Request() request) {
    const { position_info } = request.body;
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      /* prettier-ignore */
      const computed_amount=this.amount.random_message_amount(position_info.calculate_value);
      /* prettier-ignore */
      const create_order = await queryRunner.manager.create(OrderRecordEntity,{ computed_amount,user_id });
      /* prettier-ignore */
      const create_position=await queryRunner.manager.create(MessageCardPostionEntity,{
        calculate_computed_date:this.position.computed_last_date(position_info),
        ...position_info,
        user_id
      });
      /** 创建映射关系 **/
      create_position.relation_order = create_order;
      create_order.relation_random_message_position = [create_position];
      /* prettier-ignore */
      await queryRunner.manager.save(OrderRecordEntity,create_order);
      /* prettier-ignore */
      await queryRunner.manager.save(MessageCardPostionEntity,create_position);
      await queryRunner.commitTransaction();
      return {
        order_id: create_order.order_id,
        position_id: create_position.position_id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  /** 获取随机信息流广告位列表 **/
  @Get("list")
  async list_all_random_message_position(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.message_card_position_table.find({
      where: { user_id },
    });
    return result;
  }
  /** 获取随机信息流广告位详情 **/
  @Get("detail")
  async get_random_message_position_detail(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { position_id } = request.query;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    /*  prettier-ignore */
    const result = await this.message_card_position_table.findOneBy({position_id,user_id});
    return result;
  }

  /** 更新随机信息流广告位信息 **/
  @Post("update")
  async update_random_message_position(@Request() request) {
    /*  prettier-ignore */
    /** subject_detail_page(投放页面),position_value(投放位置)不允许修稿 **/
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {position_id,...position_info} = request.body;
    /*  prettier-ignore */
    await this.message_card_position_table.update({ position_id },{
      calculate_computed_date:this.position.computed_last_date(position_info),
      ...position_info
    });
    return true;
  }
}
