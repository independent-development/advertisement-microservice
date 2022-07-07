import { Controller, Get, Post, Request } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AuthService } from "@/services/version1/auth.service";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

@Controller("/v1/transaction/")
export class TransactionController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(TransactionRecordEntity) private transaction_table,
  ) {}

  /** 获取交易列表 **/
  @Get("list")
  async transaction_list(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.transaction_table.find({ where: { user_id } });
    return result;
  }

  /** 完成交易 **/
  @Post("complate")
  async complate_transaction(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    return user_id;
  }
}
