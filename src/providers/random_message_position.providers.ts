import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BasicEntity } from "@/providers/basic.providers";
import { OrderRecordEntity } from "@/providers/order_record.providers";

import { active_status_enums } from "@/emuns/active_status_enums";
import { resource_type_enums } from "@/emuns/resource_type_enums";

@Entity({ database: "positions", name: "random_message_position" })
export class RandomMessagePostionEntity extends BasicEntity {
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
    type: "int",
    nullable: false,
    default: 1000,
    comment: "随机信息流广告的投放方式为按浏览次数计费,1000次起步",
  })
  calculate_value: number | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: resource_type_enums,
    default: resource_type_enums.OSS_URL,
    comment: "广告资源类型",
  })
  resource_type: string | undefined;

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
  link_url: string | undefined;

  @Column({
    type: "int",
    nullable: true,
    comment: "观看量",
  })
  watch: number | undefined;
}
