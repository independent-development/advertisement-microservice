import { NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";

export class ResponseInterceptor implements NestInterceptor {
  intercept(context, next) {
    return next.handle().pipe(
      map((response) => {
        return { code: 200, data: response, message: "" };
      }),
    );
  }
}
