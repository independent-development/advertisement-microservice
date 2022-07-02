import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CommodityEntity } from "./providers/commodity_entity.providers";

@Injectable()
export class AppService {
  constructor(@InjectRepository(CommodityEntity) private commodity_record) {}

  getHello(): string {
    return "Hello World!";
  }

  test_commodityEntityRepository() {
    return this.commodity_record;
  }
}
