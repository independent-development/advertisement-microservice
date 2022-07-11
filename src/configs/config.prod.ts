import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";
import { Transport, ClientsModuleOptions } from "@nestjs/microservices";

export const jwt_secret = "local_jwt_secret";
export const client_module_config: ClientsModuleOptions = [
  {
    name: "USER_SERVICES",
    transport: Transport.TCP,
    options: { host: "user-center-microservice-prod", port: 5050 },
  },
];
export const redis_module_config = {
  config: {
    url: "redis://localhost:6379",
  },
};
export const cache_module_config = {
  store: redisStore,
  host: "redis-prod-mian-001.jnmb39.0001.apse1.cache.amazonaws.com",
  port: 6379,
  ttl: 60 * 60 * 1000,
};
export const mysql_module_config: TypeOrmModuleOptions = {
  port: 3306,
  type: "mysql",
  host: "yogaho-database.cluster-cmlqabuz16ur.ap-southeast-1.rds.amazonaws.com",
  username: "yogaho_admin",
  password: "glyz205070410",
  synchronize: true,
};
