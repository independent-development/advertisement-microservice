import {
  Entity,
  Column,
  Index,
  OneToOne,
  Generated,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { status_enums } from "@/emuns/status_enums";
import { active_status_enums } from "@/emuns/active_status_enums";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

@Entity({ database: "orders", name: "order_record" })
export class OrderRecordEntity {
  @PrimaryGeneratedColumn("uuid")
  order_id: string | undefined;

  @Column({ nullable: true })
  fk_commodity_id: string | undefined;

  /** 商品编号 **/
  @OneToOne(
    () => CommodityEntity,
    (commodity_record) => commodity_record.relation_order,
    { nullable: true, onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "fk_commodity_id" })
  relation_commodity: CommodityEntity | undefined;

  @Column({ nullable: true })
  fk_transaction_hash: string | undefined;

  /** 交易哈希 **/
  @OneToOne(
    () => TransactionRecordEntity,
    (transaction_record) => transaction_record.transaction_hash,
    { nullable: true, onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "fk_transaction_hash" })
  relation_transaction_hash: TransactionRecordEntity | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: active_status_enums,
    default: active_status_enums.ACTIVE,
  })
  active_status: string | undefined;

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
    default: () => "NOW()",
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

  @Index()
  @Column()
  @Generated("uuid")
  user_id: string | undefined;
}
