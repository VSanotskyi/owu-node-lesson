import { IError } from "../interfaces/errorInterface";

const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status: number, message = messageList[status]) => {
  const error = new Error(message) as IError;

  error.status = status;

  return error;
};

export { HttpError };
