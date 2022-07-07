import {
  Entity,
  Column,
  Index,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { order_status_enums } from "@/emuns/order_status_enums";

@Entity({ database: "orders", name: "order_record" })
export class OrderRecordEntity {
  @PrimaryGeneratedColumn("uuid")
  order_id: string | undefined;

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
    nullable: false,
    enum: order_status_enums,
    default: order_status_enums.CREATED,
  })
  order_status: string | undefined;

  @Index()
  @Column()
  @Generated("uuid")
  user_id: string | undefined;
}
