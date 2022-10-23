import { NOT_FOUND_STATUS_CODE } from "../constants/index.js";

export const undefinedRequestMiddleware = (request, response, next) => response.status(NOT_FOUND_STATUS_CODE).json({
    message: `Not Found Route, ${request.method}, ${request.path}`
});
