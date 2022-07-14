import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BasicEntity } from "@/providers/basic.providers";
import { OrderRecordEntity } from "@/providers/order_record.providers";

import { active_status_enums } from "@/emuns/active_status_enums";
import { calculate_type_enums } from "@/emuns/calculate_type_enums";
import { message_card_length_width_ratio_enum } from "@/emuns/message_card_length_width_ratio_enum";

@Entity({ database: "positions", name: "message_card_position" })
export class MessageCardPostionEntity extends BasicEntity {
  @PrimaryGeneratedColumn("uuid")
  position_id: string | undefined;

  /** 多个广告位对应一个订单 **/
  @ManyToOne(
    () => OrderRecordEntity,
    (order_record) => order_record.relation_random_message_position,
  )
  relation_order: OrderRecordEntity | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: active_status_enums,
    default: active_status_enums.UNACTIVE,
  })
  active_status: string | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: calculate_type_enums,
    default: calculate_type_enums.NUMBER,
    comment: "投放类型默认为次",
  })
  calculate_type: string | undefined;

  @Column({
    type: "int",
    nullable: false,
    default: 100,
    comment: "随机信息流广告的投放方式为按浏览次数计费,最低100次",
  })
  calculate_value: number | undefined;

  @Column({
    type: "datetime",
    nullable: true,
    comment: "投放周期计算后的日期",
  })
  calculate_computed_date: string | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: message_card_length_width_ratio_enum,
    default: message_card_length_width_ratio_enum.W1H1,
    comment: "资源长宽比,默认1:1",
  })
  length_width_ratio: string | undefined;

  @Column({
    type: "varchar",
    length: 200,
    comment: "广告资源的URL链接",
  })
  resource_link: string | undefined;

  @Column({
    type: "varchar",
    length: 36,
    nullable: true,
    comment: "广告资源的标题",
  })
  title: string | undefined;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
    comment: "广告资源的详情",
  })
  discription: string | undefined;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
    comment: "广告资源跳转的URL",
  })
  open_link_url: string | undefined;

  @Column({
    type: "int",
    nullable: true,
    comment: "观看量",
  })
  watch: number | undefined;
}
