
export class SucessResponseModel {
    status: boolean;
    message: string;
    code: number;
    data: any;
    error: any;
}

class InternalErrorModel {
    name: string;
    message: string;
    code: number;
    stack?: any;
}

export class ErrorResponseModel {
    status: boolean;
    message: string;
    code: number;
    error: InternalErrorModel;
}
