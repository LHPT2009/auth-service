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

                const request = ctx.getRequest();
                let message: string;
                switch (request.method) {
                    case 'POST':
                        message = 'Created successfully!';
                        break;
                    case 'PATCH':
                        message = 'Updated successfully!';
                        break;
                    case 'PUT':
                        message = 'Updated successfully!';
                        break;
                    case 'DELETE':
                        message = 'Deleted successfully!';
                        break;
                    case 'GET':
                        message = 'Get Data successfully!';
                        break;
                }

                const dataresponse = data ? data : null
                return new ResponseDto(status, message, dataresponse);
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

                const response = new ResponseDto(status, 'ERROR', message);

                throw response;
            }),
        );
    }
}