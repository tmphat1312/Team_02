export enum ErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",

  EMAIL_REQUIRED = "EMAIL_REQUIRED",
  OTP_REQUIRED = "OTP_REQUIRED",
  EMAIL_NOT_EXIST = "EMAIL_NOT_EXIST",
  OTP_NOT_VALID = "OTP_NOT_VALID",
  OTP_EXPIRED = "OTP_EXPIRED",
  SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED",
}
