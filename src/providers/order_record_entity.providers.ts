import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BasicEntity } from "@/providers/basic_entity";
import { PostionEntity } from "@/providers/position_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";
import { order_status_enums } from "@/emuns/order_status_enums";

/** 一个订单对应一笔交易,对应多个广告 **/

@Entity({ database: "orders", name: "order_record" })
export class OrderRecordEntity extends BasicEntity {
  @PrimaryGeneratedColumn("uuid")
  order_id: string | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: order_status_enums,
    default: order_status_enums.CREATED,
  })
  order_status: string | undefined;

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

  @OneToOne(() => PostionEntity, (position) => position.relation_order)
  @JoinColumn([{ name: "fk_position_id", referencedColumnName: "position_id" }])
  relation_position: PostionEntity | undefined;

  @Column({ nullable: true })
  fk_position_id: string | undefined;
}
