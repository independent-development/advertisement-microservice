import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";
import { Transport, ClientsModuleOptions } from "@nestjs/microservices";

export const jwt_secret = "local_jwt_secret";
export const client_module_config: ClientsModuleOptions = [
  {
    name: "TEST_SERVER",
    transport: Transport.TCP,
    options: { host: "127.0.0.1", port: 5050 },
  },
];
export const cache_module_config = {
  store: redisStore,
  host: "test_redis_service",
  port: 6379,
  ttl: 60 * 60 * 1000,
};
export const mysql_module_config: TypeOrmModuleOptions = {
  port: 3306,
  type: "mysql",
  host: "test_mysql_service",
  username: "root",
  password: "glyz205070410",
  synchronize: true,
};
