import { Inject, Injectable, CanActivate } from "@nestjs/common";

/** TOKEN鉴权 **/
@Injectable()
export class UserGuard implements CanActivate {
  constructor(@Inject("TEST_SERVER") private user_services) {}
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const { API_TOKEN } = request.cookies;
    const verify_result = await this.user_services
      .send("jwt_verify", { API_TOKEN })
      .toPromise();
    return verify_result;
  }
}
