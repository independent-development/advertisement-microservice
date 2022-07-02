import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(@Inject("USER_SERVICES") private user_services) {}

  /** 根据jwt令牌获取用户信息 **/
  async get_user_info(API_TOKEN) {
    const user_detail = await this.user_services
      .send("user_detail", { API_TOKEN })
      .toPromise();
    return user_detail;
  }
}
