import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Generated,
} from "typeorm";

import { valid_enums } from "@/emuns/valid_enums";
import { status_enums } from "@/emuns/status_enums";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

@Entity({ database: "orders", name: "order_record" })
export class OrderRecordEntity {
  @PrimaryGeneratedColumn("uuid")
  order_id: string | undefined;

  /** 商品编号 **/
  @ManyToOne(
    () => CommodityEntity,
    (commodity_record) => commodity_record.commodity_id,
  )
  fk_commodity_id: string | undefined;

  /** 交易哈希 **/
  @ManyToOne(
    () => TransactionRecordEntity,
    (transaction_record) => transaction_record.transaction_hash,
  )
  fk_transaction_hash: string | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: valid_enums,
    default: valid_enums.VALID,
  })
  valid: string | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: status_enums,
    default: status_enums.PEDDING,
  })
  status: string | undefined;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  create_time: string | undefined;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  complate_time: string | undefined;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  update_time: string | undefined;

  @Column()
  @Generated("uuid")
  user_id: string | undefined;
}
