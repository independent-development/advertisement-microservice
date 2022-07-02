import { InjectRepository } from "@nestjs/typeorm";
import { Controller, Get, Request, Post } from "@nestjs/common";

import { AuthService } from "@/services/version1/auth.service";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { UserAccountEntity } from "@/providers/user_account_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

import get_calculate_computed_date from "@/utils/get_calculate_computed_date";

@Controller("/v1/commodity/")
export class CommodityController {
  constructor(
    private readonly auth: AuthService,
    @InjectRepository(UserAccountEntity) private user_account,
    @InjectRepository(OrderRecordEntity) private order_record,
    @InjectRepository(CommodityEntity) private commodity_record,
    @InjectRepository(TransactionRecordEntity) private transaction_record,
  ) {}

  @Get("list")
  async list_all_commodity(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const { user_id } = await this.auth.get_user_info(API_TOKEN);
    const result = await this.commodity_record.find({
      where: {
        user_id,
        valid: "VALID",
      },
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
    await this.commodity_record.insert({
      subject_detail_page: subject_detail_page.join("/"),
      calculate_computed_date,
      ...otherRequest_body,
      user_id,
    });
    return true;
  }
}
