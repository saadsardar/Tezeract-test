export const EMPLOYEE_FILE_NAME = 'employee.json';
export const DEFAULT_SUCCESS_MESSAGE = 'Operation successful';
export const DEFAULT_SERVER_ERROR_MESSAGE = 'Internal server error';
export const BAD_REQUEST_ERROR_MESSAGE = 'Bad request error';
export enum HttpStatusCodes {
  Success = 200,
  BadRequest = 400,
  ServerError = 500,
}

export const RESPONSE_MESSAGE = {
  FETCHED: "Result Listed Successfully",
};

export const RESPONSE_STATUS = {
  SUCCESS: true,
  FAIL: false,
};

export const ERROR_MESSEAGES = {
  MIN_LESSER_THAN_MAX : 'Min Salary must not be greater than Max Salary'
}