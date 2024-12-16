import { HttpErrorHandler } from "../exceptions/http-error.handler";

export class UserAlreadyExist extends HttpErrorHandler {

  constructor(message: string) {
    super(409,message);
  }
}

export class UserNotFound extends HttpErrorHandler {

  constructor() {
    super(404, "User not found");
  }
}


export class InvalidPaginationParams extends HttpErrorHandler {

  constructor(message: string) {
    super(400, "Invalid filter or pagination");
  }
}