import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export type DataResponse = unknown;

export type ErrorResponse = {
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

export const noContent = (c: Context) => {
  const data: DataResponse = null;
  const error: ErrorResponse = null;
  const metadata: MetadataResponse = {};
  return c.json(
    { data, error, metadata },
    StatusCodes.NO_CONTENT as ContentfulStatusCode
  );
};

export const unauthorized = (c: Context, errorMsg?: string) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    message: errorMsg || ReasonPhrases.UNAUTHORIZED,
    statusCode: StatusCodes.UNAUTHORIZED,
    statusText: ReasonPhrases.UNAUTHORIZED,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.UNAUTHORIZED);
};

export const notFound = (c: Context, errorMsg?: string) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    message: errorMsg || ReasonPhrases.NOT_FOUND,
    statusCode: StatusCodes.NOT_FOUND,
    statusText: ReasonPhrases.NOT_FOUND,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.NOT_FOUND);
};

export const badRequest = (c: Context, errorMsg?: string) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    message: errorMsg || ReasonPhrases.BAD_REQUEST,
    statusCode: StatusCodes.BAD_REQUEST,
    statusText: ReasonPhrases.BAD_REQUEST,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.BAD_REQUEST);
};

export const internalServerError = (c: Context, errorMsg?: string) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    message: errorMsg || ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.INTERNAL_SERVER_ERROR);
};
