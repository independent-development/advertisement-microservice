import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { BasicEntity } from "@/providers/basic_entity";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { transaction_status_enums } from "@/emuns/transaction_status_enums";

@Entity({ database: "orders", name: "transaction_record" })
export class TransactionRecordEntity extends BasicEntity {
  @PrimaryGeneratedColumn("uuid")
  transaction_id: string | undefined;

  @OneToOne(
    () => OrderRecordEntity,
    (order_record) => order_record.relation_transaction,
  )
  relation_order: OrderRecordEntity | undefined;

  @Column({
    type: "enum",
    enum: transaction_status_enums,
    default: transaction_status_enums.CREATED,
    comment: "交易状态",
    nullable: false,
  })
  transaction_status: string | undefined;

  @Column({
    length: 80,
    unique: true,
    type: "varchar",
    nullable: true,
    comment: "交易哈希",
  })
  transaction_hash: string | undefined;

  @Column({
    type: "int",
    nullable: true,
    comment: "交易金额",
  })
  payment_amount: number | undefined;
}
