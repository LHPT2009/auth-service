import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseDto } from 'common/dto/response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            map((data) => {
                const ctx = context.switchToHttp();
                const response = ctx.getResponse();

                const status = response?.statusCode || 200;

                const dataresponse = data ? data : null
                return new ResponseDto(status, 'Success!', dataresponse);
            }),
            catchError(error => {
                const status =
                    error instanceof HttpException
                        ? error.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;

                const message =
                    error instanceof HttpException
                        ? error.getResponse()
                        : 'An unexpected error occurred';

                const response = new ResponseDto(status, 'Error!', message);

                throw response;
            }),
        );
    }
}