import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}

export class UnauthorizedError extends CustomError {
    statusCode = 401;
    constructor(message = "Unauthorized") {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}

export class ForbiddenError extends CustomError {
    statusCode = 403;
    constructor(message = "Forbidden") {
        super(message);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}

export class NotFoundError extends CustomError {
    statusCode = 404;
    constructor(message = "Not found") {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}

export class ConflictError extends CustomError {
    statusCode = 409;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}

export class TooManyRequestsError extends CustomError {
    statusCode = 429;
    constructor(message = "Too many requests") {
        super(message);
        Object.setPrototypeOf(this, TooManyRequestsError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}

export class BadGatewayError extends CustomError {
    statusCode = 502;
    constructor(message = "Upstream service unavailable") {
        super(message);
        Object.setPrototypeOf(this, BadGatewayError.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}
