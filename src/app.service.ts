import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { OrderRecordEntity } from "./providers/order_record.providers";

@Injectable()
export class AppService {
  constructor(@InjectRepository(OrderRecordEntity) private order_table) {}

  getHello(): string {
    return "Hello World!";
  }

  test_commodityEntityRepository() {
    return this.order_table;
  }
}
