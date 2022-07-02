import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "@/app.module";
import { UserGuard } from "@/guards/user_guard.guard";
import { ErrorExceptionFilter } from "@/filters/error.filter";
import { ResponseInterceptor } from "@/interceptors/response.interceptor";

/** 创建http接口服务 **/
async function bootstrapHttpService() {
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix("api");
  const user_services = app.get("USER_SERVICES");
  await app.useGlobalGuards(new UserGuard(user_services));
  await app.useGlobalFilters(new ErrorExceptionFilter());
  await app.useGlobalInterceptors(new ResponseInterceptor());
  await app.use(cookieParser());
  await app.listen(3300);
}

/** 创建tcp接口服务 **/
async function bootstrapMicroservice() {
  const app = await NestFactory.createMicroservice(AppModule, {
    options: { host: "0.0.0.0", port: 5060 },
  });
  const user_services = app.get("USER_SERVICES");
  await app.useGlobalGuards(new UserGuard(user_services));
  await app.useGlobalFilters(new ErrorExceptionFilter());
  await app.listen();
}

(async () => {
  await bootstrapHttpService();
  await bootstrapMicroservice();
})();
