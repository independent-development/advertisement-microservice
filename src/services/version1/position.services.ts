import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { BannerFixedPostionEntity } from "@/providers/banner_fixed_position.providers";
import { MessageCardPostionEntity } from "@/providers/message_card_position.providers";
import get_calculate_computed_date from "@/utils/get_calculate_computed_date";

@Injectable()
export class PostionService {
  constructor(
    /*  prettier-ignore */
    @InjectRepository(BannerFixedPostionEntity) private banner_fixed_position_table,
    /*  prettier-ignore */
    @InjectRepository(MessageCardPostionEntity) private message_card_position_table,
  ) {}

  /** 根据投放的周期自动计算合集的投放类型 **/
  computed_last_date({ calculate_type, calculate_value }) {
    /* prettier-ignore */
    const calculate_computed_date = get_calculate_computed_date(calculate_type,calculate_value);
    return calculate_computed_date;
  }

  /** 创建随机信息流广告位 **/
  async create_random_message(position_info, user_id) {
    /*  prettier-ignore */
    const create_position = await this.message_card_position_table.create({...position_info,user_id});
    return create_position;
  }
}
