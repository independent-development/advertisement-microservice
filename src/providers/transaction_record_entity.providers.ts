import {
  Entity,
  Column,
  OneToOne,
  Generated,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { transaction_status_enums } from "@/emuns/transaction_status_enums";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";

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
  relation_order: OrderRecordEntity | undefined;

  @Column({
    type: "enum",
    enum: transaction_status_enums,
    default: transaction_status_enums.CREATED,
    nullable: false,
  })
  transaction_status: string | undefined;

  @CreateDateColumn({
    type: "datetime",
    name: "create_time",
    comment: "创建记录的时间",
  })
  createTime: string | undefined;

  @UpdateDateColumn({
    type: "datetime",
    name: "update_time",
    comment: "更新记录的时间",
  })
  updateTime: string | undefined;

  @DeleteDateColumn({
    type: "datetime",
    name: "delete_time",
    comment: "删除记录的时间",
  })
  deleteTime: string | undefined;

  @Column()
  @Generated("uuid")
  user_id: string | undefined;
}
