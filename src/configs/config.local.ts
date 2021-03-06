import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";
import { Transport, ClientsModuleOptions } from "@nestjs/microservices";

export const jwt_secret = "local_jwt_secret";
export const client_module_config: ClientsModuleOptions = [
  {
    name: "USER_SERVICES",
    transport: Transport.TCP,
    options: { host: "127.0.0.1", port: 5050 },
  },
];
export const redis_module_config = {
  config: {
    url: "redis://localhost:6379",
  },
};
export const cache_module_config = {
  store: redisStore,
  host: "localhost",
  port: 6379,
  ttl: 60 * 60 * 1000,
};
export const mysql_module_config: TypeOrmModuleOptions = {
  port: 3306,
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  synchronize: true,
};
