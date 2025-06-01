import { z } from "zod";

import { ErrorCode } from "../middlewares/error/error-codes";

export const getFirstZodError = (error: z.ZodError) => {
  const firstError = error.errors[0];
  const customError = firstError as typeof firstError & {
    params?: { errorCode?: string };
  };

  return {
    errorMessage: customError.message,
    errorCode: customError.params?.errorCode || ErrorCode.VALIDATION_FAILED,
  };
};
