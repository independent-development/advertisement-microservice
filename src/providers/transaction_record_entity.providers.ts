import {
  Entity,
  Column,
  OneToOne,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { transaction_status_enums } from "@/emuns/transaction_status_enums";
import { CommodityEntity } from "@/providers/commodity_entity.providers";

@Entity({ database: "orders", name: "transaction_record" })
export class TransactionRecordEntity {
  @PrimaryGeneratedColumn("uuid")
  transaction_id: string | undefined;

  @OneToOne(
    () => CommodityEntity,
    (commodity_record) => commodity_record.relation_transaction,
  )
  relation_commodity: CommodityEntity | undefined;

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

  @CreateDateColumn({
    type: "datetime",
    name: "create_time",
    comment: "创建记录的时间",
  })
  create_time: string | undefined;

  @UpdateDateColumn({
    type: "datetime",
    name: "update_time",
    comment: "更新记录的时间",
  })
  update_time: string | undefined;

  @DeleteDateColumn({
    type: "datetime",
    name: "delete_time",
    comment: "删除记录的时间",
  })
  delete_time: string | undefined;

  @Column({
    type: "enum",
    enum: transaction_status_enums,
    default: transaction_status_enums.CREATED,
    comment: "交易状态",
    nullable: false,
  })
  transaction_status: string | undefined;

  @Column()
  @Generated("uuid")
  user_id: string | undefined;
}
