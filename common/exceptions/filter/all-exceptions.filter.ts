import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
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
                : { message: 'Internal server error' };

        const error =
            typeof exceptionResponse === 'object' && exceptionResponse.hasOwnProperty('error')
                ? (exceptionResponse as any).error
                : exception instanceof HttpException
                    ? exception.message
                    : 'Error';

        let message =
            typeof exceptionResponse === 'object' && exceptionResponse.hasOwnProperty('message')
                ? (exceptionResponse as any).message
                : 'An unexpected error occurred';

        message = Array.isArray(message) ? message : [message];

        const responseErrorDto = new ResponseErrorDto(status, error, message);

        response.status(status).json(responseErrorDto);
    }
}