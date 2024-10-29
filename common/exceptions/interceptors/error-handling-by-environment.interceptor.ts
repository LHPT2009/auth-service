import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseErrorDto } from 'common/dto/response-error.dto';

@Injectable()
export class ErrorHandlingByEnvironmentInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            catchError(error => {
                const isDevelopment = process.env.NODE_ENV === 'development';
                if (isDevelopment) {
                    throw error;
                } else {
                    const status = HttpStatus.BAD_REQUEST;
                    const responseErrorDto = new ResponseErrorDto(
                        status,
                        'Bad Request',
                        ['An unexpected error occurred']
                    );

                    throw new HttpException(responseErrorDto, status);
                }
            }),
        );
    }
}