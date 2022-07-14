import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BasicEntity } from "@/providers/basic.providers";
import { MessageCardPostionEntity } from "@/providers/message_card_position.providers";
import { BannerFixedPostionEntity } from "@/providers/banner_fixed_position.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record.providers";
import { order_status_enums } from "@/emuns/order_status_enums";

/** 一个订单对应一笔交易,对应多个广告 **/

@Entity({ database: "orders", name: "order_record" })
export class OrderRecordEntity extends BasicEntity {
  @PrimaryGeneratedColumn("uuid")
  order_id: string | undefined;

  @Column({
    type: "int",
    nullable: false,
    comment: "计算后的应付金额",
  })
  computed_amount: number | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: order_status_enums,
    default: order_status_enums.CREATED,
  })
  order_status: string | undefined;

  /** 一个订单对应多个广告位 **/
  @OneToOne(
    () => TransactionRecordEntity,
    (transaction_record) => transaction_record.relation_order,
  )
  @JoinColumn([
    { name: "fk_transaction_id", referencedColumnName: "transaction_id" },
  ])
  relation_transaction: TransactionRecordEntity | undefined;

  @Column({ nullable: true })
  fk_transaction_id: string | undefined;

  @OneToMany(
    () => BannerFixedPostionEntity,
    (banner_fixed_position) => banner_fixed_position.relation_order,
  )
  relation_banner_fixed_position: BannerFixedPostionEntity[] | undefined;

  @OneToMany(
    () => MessageCardPostionEntity,
    (random_message_position) => random_message_position.relation_order,
  )
  relation_random_message_position: MessageCardPostionEntity[] | undefined;
}
