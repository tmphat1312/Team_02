import type { ErrorHandler } from "hono";
import { consola } from "consola";
import { Code, ErrorResponse } from "./error-codes";
import { ZodError } from "zod";

function handleTypeErrors(err: any): ErrorResponse {
    let response: ErrorResponse;
    if (err instanceof ErrorResponse) {
        response = err;
    } else if (err instanceof ZodError) {
        response = new ErrorResponse(Code.InvalidArgument, err.errors[0]?.message || "Invalid input");
    } else {
        response = new ErrorResponse(Code.Internal, "An internal server error occurred.");
    }
    return response;
}
export const onError: ErrorHandler = (err, ctx) => {
    const env = ctx.env?.NODE_ENV || process.env?.NODE_ENV;
    const isProduction = env === "production";
    if (!isProduction) consola.error(err);
    let finalErr = handleTypeErrors(err)
    return ctx.json(finalErr.Error(), finalErr.HttpStatus());
};
