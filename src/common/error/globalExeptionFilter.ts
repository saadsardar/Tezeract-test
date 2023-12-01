import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseFactory } from '../web/responseFactory';
import { BAD_REQUEST_ERROR_MESSAGE, DEFAULT_SERVER_ERROR_MESSAGE } from '../constants';
import { BadRequestErrorModel, InternalServerErrorModel } from '../types/error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    if (exception instanceof BadRequestException) {
      const badRequestException = exception as BadRequestException;
      const validationErrors = badRequestException.getResponse()['message'];

      const result = new BadRequestErrorModel(validationErrors);
      const customResponse = ResponseFactory.createResponse(result, BAD_REQUEST_ERROR_MESSAGE);

      return response.status(customResponse.code).send(customResponse);
    }
    const result = new InternalServerErrorModel(DEFAULT_SERVER_ERROR_MESSAGE)
    const customResponse = ResponseFactory.createResponse(
      result,
      DEFAULT_SERVER_ERROR_MESSAGE,
    );

    return response.status(customResponse.code).send(customResponse);
  }
}
