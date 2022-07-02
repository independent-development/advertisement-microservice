import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { valid_enums } from "@/emuns/valid_enums";
import { user_role_enum } from "@/emuns/user_role_enum";

@Entity({ database: "user", name: "user_account" })
export class UserAccountEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id: string | undefined;

  /** 用户的角色 **/
  @Column({
    type: "enum",
    enum: user_role_enum,
    nullable: false,
    default: user_role_enum.COMMON,
  })
  role: string | undefined;

  /** 用户名 **/
  @Column({
    length: 15,
    name: "username",
    type: "varchar",
    unique: true,
    nullable: false,
  })
  username: string | undefined;

  /** 密码 **/
  @Column({ type: "varchar", length: 40, nullable: false })
  password: string | undefined;

  /** 用户的e_mail **/
  @Column({ type: "varchar", length: 40, nullable: true })
  e_mail: string | undefined;

  /** 绑定的web3钱包 **/
  @Column({ type: "varchar", length: 40, nullable: true })
  wallet: string | undefined;

  /** 手机号码 **/
  @Column({ type: "varchar", length: 20, nullable: true, unique: true })
  mobile_phone: string | undefined;

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
  update_time: string | undefined;
}
