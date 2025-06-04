import { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { ErrorCode } from "../constants/error-codes";

export type DataResponse = unknown;

export type ErrorResponse = {
  code: string;
  message: string;
  statusCode: number;
  statusText: string;
} | null;

export type MetadataResponse = unknown;

export type OkOptions = {
  data: DataResponse;
  meta?: MetadataResponse;
};

const isOkOptions = (options: unknown): options is OkOptions => {
  return (
    typeof options === "object" &&
    options !== null &&
    "data" in options &&
    "meta" in options
  );
};

export const ok = (c: Context, options: OkOptions | DataResponse) => {
  const data: DataResponse = isOkOptions(options) ? options.data : options;
  const error: ErrorResponse = null;
  const metadata: MetadataResponse = isOkOptions(options) ? options.meta : {};
  return c.json({ data, error, metadata }, StatusCodes.OK);
};

export const created = (c: Context, data: DataResponse) => {
  const error: ErrorResponse = null;
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.CREATED);
};

export const badRequest = (
  c: Context,
  errorMsg?: string,
  errorCode?: string
) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    code: errorCode ?? ErrorCode.BAD_REQUEST,
    message: errorMsg ?? ReasonPhrases.BAD_REQUEST,
    statusCode: StatusCodes.BAD_REQUEST,
    statusText: ReasonPhrases.BAD_REQUEST,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.BAD_REQUEST);
};
