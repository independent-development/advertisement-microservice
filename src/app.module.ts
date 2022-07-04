import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule } from "@nestjs/microservices";
import { Module, CacheModule } from "@nestjs/common";

import { AppController } from "@/app.controller";
import { SystemController } from "@/modules/version1/system.controller";
import { OrdersController } from "@/modules/version1/orders.controller";
import { CommodityController } from "@/modules/version1/commodity.controller";

import { AuthService } from "@/services/version1/auth.service";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

import config from "@/configs";

@Module({
  imports: [
    ClientsModule.register(config.client_module_config),
    CacheModule.register(config.cache_module_config),
    TypeOrmModule.forRoot({
      ...config.mysql_module_config,
      entities: [CommodityEntity, OrderRecordEntity, TransactionRecordEntity],
    }),
    TypeOrmModule.forFeature([CommodityEntity]),
    TypeOrmModule.forFeature([OrderRecordEntity]),
    TypeOrmModule.forFeature([TransactionRecordEntity]),
  ],
  controllers: [
    AppController,
    SystemController,
    OrdersController,
    CommodityController,
  ],
  providers: [AuthService],
})
export class AppModule {}
