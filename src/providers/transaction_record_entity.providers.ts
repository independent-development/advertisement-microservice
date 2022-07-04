import { Entity, PrimaryColumn, Column, OneToOne, Generated } from "typeorm";

import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { active_status_enums } from "@/emuns/active_status_enums";

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
    enum: active_status_enums,
    default: active_status_enums.ACTIVE,
  })
  active_status: string | undefined;

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

  @Column()
  @Generated("uuid")
  user_id: string | undefined;
}
