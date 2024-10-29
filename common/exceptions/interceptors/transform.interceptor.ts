import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseDto } from 'common/dto/response.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
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
            })
        );
    }
}