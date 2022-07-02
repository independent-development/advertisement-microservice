import { Inject, Controller, Get, CACHE_MANAGER } from "@nestjs/common";

@Controller("/v1/")
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private redis_cache,
    @Inject("USER_SERVICES") private user_service,
  ) {}

  @Get("hello")
  hello() {
    this.redis_cache.set("test", "hello words");
    return "hello words";
  }

  @Get("test")
  async test() {
    console.log("adsd");
    const result = await this.user_service.send("test", {}).toPromise();
    console.log("result", result);
    return result;
  }
}
