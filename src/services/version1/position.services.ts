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

  /** 创建固定广告位 **/
  async create_banner_fixed(position_info, user_id) {
    /*  prettier-ignore */
    const {calculate_type,calculate_value,subject_detail_page,...otherRequest_body} = position_info;
    /*  prettier-ignore */
    const calculate_computed_date = get_calculate_computed_date(calculate_type,calculate_value);

    const create_position = await this.banner_fixed_position_table.create({
      subject_detail_page: subject_detail_page.join("/"),
      calculate_computed_date,
      ...otherRequest_body,
      calculate_type,
      calculate_value,
      user_id,
    });

    return create_position;
  }

  /** 创建随机信息流广告位 **/
  async create_random_message(position_info, user_id) {
    /*  prettier-ignore */
    const create_position = await this.message_card_position_table.create({...position_info,user_id});
    return create_position;
  }
}
