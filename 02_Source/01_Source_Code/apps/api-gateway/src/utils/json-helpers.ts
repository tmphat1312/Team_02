import type { Context } from "hono";
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

export const forbidden = (c: Context, errorMsg?: string) => {
  const data: DataResponse = null;
  const error: ErrorResponse = {
    message: errorMsg || ReasonPhrases.FORBIDDEN,
    statusCode: StatusCodes.FORBIDDEN,
    statusText: ReasonPhrases.FORBIDDEN,
  };
  const metadata: MetadataResponse = {};
  return c.json({ data, error, metadata }, StatusCodes.FORBIDDEN);
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
