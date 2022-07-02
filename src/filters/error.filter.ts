import { Request, Response } from "express";
import { ExceptionFilter, ArgumentsHost, Catch } from "@nestjs/common";

/** 全局Error对象的过滤器 **/
@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(200).json({
      code: 10000,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: error.message,
      data: null,
    });
  }
}
