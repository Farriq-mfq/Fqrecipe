import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface WebbResponse {
    statusCode: number,
    data: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, WebbResponse> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<WebbResponse> {
        const response = context.switchToHttp().getResponse() as Response
        return next.handle().pipe(map(data => {
            return {
                statusCode: response.statusCode,
                data
            }
        }));
    }
}