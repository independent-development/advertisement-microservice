import { DataSource } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Controller, Get, Post, Request } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";

import { OrderRecordEntity } from "@/providers/order_record.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record.providers";
import { RandomMessagePostionEntity } from "@/providers/random_message_position.providers";

/** 商品控制器 **/
@Controller("/random_message_position/v1/")
export class RandomMessagePositionController {
  constructor(
    private readonly auth: AuthService,
    private readonly dataSource: DataSource,
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(OrderRecordEntity) private order_table,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
    /*  prettier-ignore */
    @InjectRepository(RandomMessagePostionEntity) private random_message_position_table,
  ) {}

  @Post("create")
  async create_random_message_position(@Request() request) {
    const position_info = request.body;
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      /* prettier-ignore */
      const create_order = await queryRunner.manager.create(OrderRecordEntity,{ user_id });
      /* prettier-ignore */
      const create_position=await queryRunner.manager.create(RandomMessagePostionEntity,{...position_info,user_id});
      /** 创建映射关系 **/
      create_position.relation_order = create_order;
      create_order.relation_random_message_position = [create_position];
      /* prettier-ignore */
      await queryRunner.manager.save(OrderRecordEntity,create_order);
      /* prettier-ignore */
      await queryRunner.manager.save(RandomMessagePostionEntity,create_position);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  @Get("list")
  async list_all_random_message_position(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.random_message_position_table.find({
      where: { user_id },
    });
    return result;
  }

  @Get("detail")
  async get_random_message_position_detail(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { position_id } = request.query;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    /*  prettier-ignore */
    const result = await this.random_message_position_table.findOneBy({position_id,user_id});
    return result;
  }

  @Post("update")
  async update_random_message_position(@Request() request) {
    /*  prettier-ignore */
    /** subject_detail_page(投放页面),position_value(投放位置)不允许修稿 **/
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {position_id,...position_info} = request.body;
    /*  prettier-ignore */
    await this.random_message_position_table.update({ position_id },position_info);
    return true;
  }
}
