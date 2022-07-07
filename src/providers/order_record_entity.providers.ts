import {
  Entity,
  Column,
  Index,
  OneToOne,
  Generated,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

@Entity({ database: "orders", name: "order_record" })
export class OrderRecordEntity {
  @PrimaryGeneratedColumn("uuid")
  order_id: string | undefined;

  /** 商品编号 **/
  @OneToOne(() => CommodityEntity, { nullable: true })
  @JoinColumn([
    { name: "fk_commodity_id", referencedColumnName: "commodity_id" },
  ])
  relation_commodity: CommodityEntity | undefined;

  @Column({ nullable: true })
  fk_commodity_id: string | undefined;

  /** 交易哈希 **/
  @OneToOne(() => TransactionRecordEntity, { nullable: true })
  @JoinColumn([
    { name: "fk_transaction_hash", referencedColumnName: "transaction_hash" },
  ])
  relation_transaction_hash: TransactionRecordEntity | undefined;

  @Column({ nullable: true })
  fk_transaction_hash: string | undefined;

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

  @Index()
  @Column()
  @Generated("uuid")
  user_id: string | undefined;
}
