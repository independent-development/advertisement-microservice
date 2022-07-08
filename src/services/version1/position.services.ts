import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { PostionEntity } from "@/providers/position_entity.providers";
import get_calculate_computed_date from "@/utils/get_calculate_computed_date";

@Injectable()
export class PostionService {
  constructor(@InjectRepository(PostionEntity) private position_table) {}

  /** 创建广告位实体 **/
  async create(position_info, user_id) {
    /*  prettier-ignore */
    const {calculate_type,calculate_value,subject_detail_page,...otherRequest_body} = position_info;
    /*  prettier-ignore */
    const calculate_computed_date = get_calculate_computed_date(calculate_type,calculate_value);

    const create_position = await this.position_table.create({
      subject_detail_page: subject_detail_page.join("/"),
      calculate_computed_date,
      ...otherRequest_body,
      calculate_type,
      calculate_value,
      user_id,
    });

    return create_position;
  }
}
