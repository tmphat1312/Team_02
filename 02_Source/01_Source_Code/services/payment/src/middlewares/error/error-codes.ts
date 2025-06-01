export enum Code {
    OK = 0,
    Canceled = 1,
    Unknown = 2,
    InvalidArgument = 3,
    DeadlineExceeded = 4,
    NotFound = 5,
    AlreadyExists = 6,
    PermissionDenied = 7,
    ResourceExhausted = 8,
    FailedPrecondition = 9,
    Aborted = 10,
    OutOfRange = 11,
    Unimplemented = 12,
    Internal = 13,
    Unavailable = 14,
    DataLoss = 15,
    Unauthenticated = 16,
}
const grpcHttpStatusMap: Record<Code, number> = {
    [Code.OK]: 200,
    [Code.Canceled]: 499,
    [Code.Unknown]: 500,
    [Code.InvalidArgument]: 400,
    [Code.DeadlineExceeded]: 504,
    [Code.NotFound]: 404,
    [Code.AlreadyExists]: 409,
    [Code.PermissionDenied]: 403,
    [Code.ResourceExhausted]: 429,
    [Code.FailedPrecondition]: 400,
    [Code.Aborted]: 409,
    [Code.OutOfRange]: 400,
    [Code.Unimplemented]: 501,
    [Code.Internal]: 500,
    [Code.Unavailable]: 503,
    [Code.DataLoss]: 500,
    [Code.Unauthenticated]: 401,
};



export class ErrorResponse extends Error {
    code: Code;
    constructor(code: Code, message: string) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
    Error() {
        return {
            code: this.code,
            message: this.message,
        };
    }
    HttpStatus() {
        return grpcHttpStatusMap[this.code];
    }
}