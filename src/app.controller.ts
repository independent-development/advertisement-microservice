import { Inject, Controller, Get, CACHE_MANAGER } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

@Controller("/v1/")
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private redis_cache,
    @Inject("TEST_SERVER") private test_client,
    @InjectRepository(OrderRecordEntity) private order_record,
    @InjectRepository(CommodityEntity) private commodity_record,
    @InjectRepository(TransactionRecordEntity) private transaction_record,
  ) {}

  @Get("hello")
  hello() {
    this.redis_cache.set("test", "hello words");
    return "hello words";
  }

  @Get("test")
  async test() {
    console.log("adsd");
    const result = await this.test_client.send("test", {}).toPromise();
    console.log("result", result);
    return result;
  }
}
