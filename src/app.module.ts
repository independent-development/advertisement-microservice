import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule } from "@nestjs/microservices";
import { Module, CacheModule } from "@nestjs/common";
import { RedisModule } from "@nestjs-modules/ioredis";

import { AppController } from "@/app.controller";
import { OrderController } from "@/modules/version1/order.controller";
import { SystemController } from "@/modules/version1/system.controller";
import { TransactionController } from "@/modules/version1/transaction.controller";
import { MessageCardPositionController } from "@/modules/version1/message_card_position.controller";

import { AuthService } from "@/services/version1/auth.service";
import { AmountService } from "@/services/version1/amount.service";
import { PostionService } from "@/services/version1/position.services";

import { OrderRecordEntity } from "@/providers/order_record.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record.providers";
import { MessageCardPostionEntity } from "@/providers/message_card_position.providers";
import { BannerFixedPostionEntity } from "@/providers/banner_fixed_position.providers";

import config from "@/configs";

@Module({
  imports: [
    RedisModule.forRoot(config.redis_module_config),
    ClientsModule.register(config.client_module_config),
    CacheModule.register(config.cache_module_config),
    TypeOrmModule.forRoot({
      ...config.mysql_module_config,
      entities: [
        OrderRecordEntity,
        MessageCardPostionEntity,
        TransactionRecordEntity,
        BannerFixedPostionEntity,
      ],
    }),
    TypeOrmModule.forFeature([OrderRecordEntity]),
    TypeOrmModule.forFeature([BannerFixedPostionEntity]),
    TypeOrmModule.forFeature([MessageCardPostionEntity]),
    TypeOrmModule.forFeature([TransactionRecordEntity]),
  ],
  controllers: [
    AppController,
    OrderController,
    SystemController,
    TransactionController,
    MessageCardPositionController,
  ],
  providers: [AuthService, AmountService, PostionService],
})
export class AppModule {}
