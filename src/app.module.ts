import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule } from "@nestjs/microservices";
import { Module, CacheModule } from "@nestjs/common";

import { AppController } from "@/app.controller";
import { OrderController } from "@/modules/version1/order.controller";
import { SystemController } from "@/modules/version1/system.controller";
import { PositionController } from "@/modules/version1/position.controller";
import { TransactionController } from "@/modules/version1/transaction.controller";

import { AuthService } from "@/services/version1/auth.service";

import { PostionEntity } from "@/providers/position_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

import config from "@/configs";

@Module({
  imports: [
    ClientsModule.register(config.client_module_config),
    CacheModule.register(config.cache_module_config),
    TypeOrmModule.forRoot({
      ...config.mysql_module_config,
      entities: [PostionEntity, OrderRecordEntity, TransactionRecordEntity],
    }),
    TypeOrmModule.forFeature([PostionEntity]),
    TypeOrmModule.forFeature([OrderRecordEntity]),
    TypeOrmModule.forFeature([TransactionRecordEntity]),
  ],
  controllers: [
    AppController,
    OrderController,
    SystemController,
    PositionController,
    TransactionController,
  ],
  providers: [AuthService],
})
export class AppModule {}
