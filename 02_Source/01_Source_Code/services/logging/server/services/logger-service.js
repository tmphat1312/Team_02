const getCurrentTimestamp = () => new Date().toISOString();
const constructLogMessage = (logType, message, context) =>
  `[${logType}] [${getCurrentTimestamp()}] [${context}]: ${message}`;

export function logError(call, callback) {
  const { message, context } = call.request;
  console.error(constructLogMessage("ERROR", message, context));
  callback(null, { success: true, message: "Error logged successfully" });
}

export function logWarning(call, callback) {
  const { message, context } = call.request;
  console.warn(constructLogMessage("WARNING", message, context));
  callback(null, { success: true, message: "Warning logged successfully" });
}

export function logInfo(call, callback) {
  const { message, context } = call.request;
  console.log(constructLogMessage("INFO", message, context));
  callback(null, { success: true, message: "Info logged successfully" });
}
