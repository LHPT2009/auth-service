import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ResponseDto } from 'common/dto/response.dto';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            catchError(error => {
                const status =
                    error instanceof HttpException
                        ? error.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;

                const message =
                    error instanceof HttpException
                        ? error.getResponse()
                        : 'An unexpected error occurred';

                const response = new ResponseDto(status, 'ERROR', message);

                return throwError(() => response);
            }),
        );
    }
}