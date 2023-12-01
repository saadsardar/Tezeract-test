import { Controller } from '@nestjs/common';
import { ResponseFactory } from './responseFactory';

@Controller()
export class BaseController {
    sendResponse<T>(
        result,
        res,
        successMessage,) {

        const response = ResponseFactory.createResponse(
            result,
            successMessage,
        );
        return res.status(response.code).send(response);
    }
}
