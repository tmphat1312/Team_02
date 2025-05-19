import type { Context } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export type DataResponse = unknown;

export type ErrorResponse = {
  code: string;
  message: string;
  status: number;
  statusText: string;
} | null;

export type MetadataResponse = unknown;

export type OkOptions = {
  data: DataResponse;
  meta?: MetadataResponse;
};

export const unauthorized = (
  c: Context,
  errorMsg?: string,
  errorCode?: string
) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    code: errorCode || "UNAUTHORIZED",
    message: errorMsg || ReasonPhrases.UNAUTHORIZED,
    status: StatusCodes.UNAUTHORIZED,
    statusText: ReasonPhrases.UNAUTHORIZED,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.UNAUTHORIZED);
};

export const forbidden = (
  c: Context,
  errorMsg?: string,
  errorCode?: string
) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    code: errorCode || "FORBIDDEN",
    message: errorMsg || ReasonPhrases.FORBIDDEN,
    status: StatusCodes.FORBIDDEN,
    statusText: ReasonPhrases.FORBIDDEN,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.FORBIDDEN);
};

export const internalServerError = (
  c: Context,
  errorMsg?: string,
  errorCode?: string
) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    code: errorCode || "INTERNAL_SERVER_ERROR",
    message: errorMsg || ReasonPhrases.INTERNAL_SERVER_ERROR,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.INTERNAL_SERVER_ERROR);
};

export const notFound = (c: Context, errorMsg?: string, errorCode?: string) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    code: errorCode || "NOT_FOUND",
    message: errorMsg || ReasonPhrases.NOT_FOUND,
    status: StatusCodes.NOT_FOUND,
    statusText: ReasonPhrases.NOT_FOUND,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.NOT_FOUND);
};

export const ok = (c: Context, options: OkOptions) => {
  const { data, meta } = options;
  const error: ErrorResponse = null;
  const metadata: MetadataResponse = meta || {};
  return c.json({ data, error, metadata }, StatusCodes.OK);
};
