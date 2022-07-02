import { Injectable, CanActivate } from "@nestjs/common";

/** TOKEN鉴权 **/
@Injectable()
export class UserGuard implements CanActivate {
  async canActivate() {
    console.log("sad");
    return true;
  }
}
