export const OK = 200;
export const CREATED = 201;
export const NO_CONTENT = 204;
export const BAD_REQUEST = 400;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;

export type HttpStatusCodes =
  | typeof OK
  | typeof CREATED
  | typeof NO_CONTENT
  | typeof BAD_REQUEST
  | typeof NOT_FOUND
  | typeof INTERNAL_SERVER_ERROR;