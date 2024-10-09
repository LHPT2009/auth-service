import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseDto } from 'common/dto/response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            map((data) => {
                const reponse = new ResponseDto(200, 'Suceess!', data)
                return reponse;
            }),
            catchError(err => {
                const reponse = new ResponseDto(400, 'Error!', err)
                throw reponse;
            }),
        );
    }
}