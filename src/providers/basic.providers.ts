import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export class BasicEntity {
  @CreateDateColumn({
    type: "datetime",
    name: "create_time",
    comment: "创建记录时间",
  })
  public create_time: string | undefined;

  @UpdateDateColumn({
    type: "datetime",
    name: "update_time",
    comment: "更新记录的时间",
  })
  public update_time: string | undefined;

  @DeleteDateColumn({
    type: "datetime",
    name: "delete_time",
    comment: "删除记录的时间",
  })
  public delete_time: string | undefined;

  @Column({ comment: "关联用户" })
  public user_id: string | undefined;
}
