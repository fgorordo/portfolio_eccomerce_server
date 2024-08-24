import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response as ExpressResponse, Request as ExpressRequest  } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class HttpResponseNormalizer<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    const response = context.switchToHttp().getResponse<ExpressResponse>();
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    return next.handle().pipe(map(data => ({
      ok: true,
      status: response.statusCode,
      path: request.path,
      data: {
        ...data
      }
    })));
  }
}