import { Entity, PrimaryColumn, Column, OneToOne, Generated } from "typeorm";

import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { valid_enums } from "@/emuns/valid_enums";

@Entity({ database: "orders", name: "transaction_record" })
export class TransactionRecordEntity {
  @PrimaryColumn({
    length: 80,
    unique: true,
    type: "varchar",
    nullable: false,
  })
  transaction_hash: string | undefined;

  @OneToOne(() => OrderRecordEntity, (order_record) => order_record.order_id)
  fk_order_id: OrderRecordEntity | undefined;

  @Column({
    type: "enum",
    nullable: false,
    enum: valid_enums,
    default: valid_enums.VALID,
  })
  valid: string | undefined;

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
