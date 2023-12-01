import { HttpStatus } from '@nestjs/common';
import {
  BadRequestErrorModel,
  ErrorModel,
  ForbiddenErrorModel,
  HandledErrorModel,
  InternalServerErrorModel,
  ResourceAlreadyExistsErrorModel,
  ResourceNotFoundErrorModel,
  UnAuthorizedErrorModel,
  ValidationFailedErrorModel
} from '../types/error';
import { ErrorResponseModel, SucessResponseModel } from '../dto';


export class ResponseFactory {
  public static createResponse<T>(
    result: any,
    successMessage?: string,
  ) {
    if (result instanceof ErrorModel) {
      const errorCode = this.getErrorHttpStatusCode(result);

      const response = this.getErrorResponse(
        result.name,
        result.message,
        errorCode,
      );

      return response;
    } else {
      const response = this.getSuccessResponse(
        successMessage,
        HttpStatus.OK,
        result
      );

      return response;
    }
  }

  private static getErrorHttpStatusCode(error: ErrorModel) {
    if (error instanceof HandledErrorModel) {
      return HttpStatus.BAD_REQUEST;
    } else if (error instanceof BadRequestErrorModel) {
      return HttpStatus.BAD_REQUEST;
    }
    else if (error instanceof ValidationFailedErrorModel) {
      return HttpStatus.BAD_REQUEST;
    } else if (error instanceof ResourceNotFoundErrorModel) {
      return HttpStatus.NOT_FOUND;
    } else if (error instanceof UnAuthorizedErrorModel) {
      return HttpStatus.UNAUTHORIZED;
    } else if (error instanceof ForbiddenErrorModel) {
      return HttpStatus.FORBIDDEN;
    } else if (error instanceof ResourceAlreadyExistsErrorModel) {
      return HttpStatus.CONFLICT;
    }
    else if (error instanceof InternalServerErrorModel) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private static getErrorResponse(
    errorName: string,
    errorMessage: string,
    errorCode: number,
    stack?: any,
  ): ErrorResponseModel {
    const errorResponse = {
      status: false,
      message: errorMessage,
      code: errorCode,
      error: {
        name: errorName,
        message: errorMessage,
        code: errorCode,
        stack: stack,
      },
      data: null,
    };

    return errorResponse;
  }

  private static getSuccessResponse(
    successMessage: string,
    code: number,
    result: any
  ) {
    let response: SucessResponseModel = {
      status: true,
      message: successMessage,
      code,
      data: result,
      error: null
    };
    return response;
  }
}
