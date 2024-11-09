import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { MESSAGE } from 'common/constants/message';
import { ResponseErrorDto } from 'common/dto/response-error.dto';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: null };

        const error =
            typeof exceptionResponse === 'object' && exceptionResponse.hasOwnProperty('error')
                ? (exceptionResponse as any).error
                : exception instanceof HttpException
                    ? exception.message
                    : MESSAGE.INTERNAL_SERVER_ERROR;

        let message: string[];

        if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
            message = Array.isArray((exceptionResponse as any).message)
                ? (exceptionResponse as any).message
                : [exception instanceof Error ? exception.message : 'An unexpected error occurred'];
        } else {
            message = undefined;
        }

        const responseErrorDto = new ResponseErrorDto(status, error, message);

        response.status(status).json(responseErrorDto);
    }
}