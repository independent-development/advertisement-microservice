import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BasicEntity } from "@/providers/basic_entity";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";

import { active_status_enums } from "@/emuns/active_status_enums";
import { content_type_enums } from "@/emuns/content_type_enums";
import { position_value_enums } from "@/emuns/position_value_enums";
import { calculate_type_enums } from "@/emuns/calculate_type_enums";
import { resource_type_enums } from "@/emuns/resource_type_enums";

@Entity({ database: "orders", name: "position" })
export class PostionEntity extends BasicEntity {
  @PrimaryGeneratedColumn("uuid")
  position_id: string | undefined;

  @ManyToOne(
    () => OrderRecordEntity,
    (order_record) => order_record.relation_position,
  )
  relation_order: OrderRecordEntity | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: active_status_enums,
    default: active_status_enums.ACTIVE,
  })
  active_status: string | undefined;

  /** 投放类型默认为天 **/
  @Column({
    type: "enum",
    nullable: false,
    enum: calculate_type_enums,
    default: calculate_type_enums.DAY,
  })
  calculate_type: string | undefined;

  /** 投放周期的数值 **/
  @Column({
    type: "int",
    nullable: false,
    default: 1,
  })
  calculate_value: number | undefined;

  /** 投放周期计算后的日期 **/
  @Column({ type: "datetime" })
  calculate_computed_date: string | undefined;

  /** 投放在网站的具体的主题详情页 **/
  @Column({
    type: "varchar",
    nullable: false,
    length: 200,
  })
  subject_detail_page: string | undefined;

  /** 广告位的具体值 **/
  @Column({
    type: "enum",
    nullable: false,
    enum: position_value_enums,
    default: position_value_enums.PAGE_TOP,
  })
  position_value: string | undefined;

  /** 广告类型默认为图片IMAGE **/
  @Column({
    type: "enum",
    nullable: false,
    enum: content_type_enums,
    default: content_type_enums.IMAGE,
  })
  content_type: string | undefined;

  /** 广告资源类型 **/
  @Column({
    type: "enum",
    nullable: false,
    enum: resource_type_enums,
    default: resource_type_enums.OSS_URL,
  })
  resource_type: string | undefined;

  /** 广告资源的URL链接 **/
  @Column({
    type: "varchar",
    length: 200,
  })
  resource_link: string | undefined;

  /** 广告资源的标题 **/
  @Column({
    type: "varchar",
    length: 36,
    nullable: true,
  })
  title: string | undefined;

  /** 广告资源的详情 **/
  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  discription: string | undefined;

  /** 广告资源跳转的URL **/
  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  link_url: string | undefined;
}
