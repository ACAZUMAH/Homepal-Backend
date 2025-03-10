import { logger } from "src/logger/logger";
import { unwrapResolverError } from "@apollo/server/errors";
import { GraphQLFormattedError } from "graphql/error";
import createError from "http-errors";
import { rollbar } from "src/logger/rollbar";

const STATUS_CODES = new Map<number, string>([
  [400, "BAD_REQUEST"],
  [401, "UNAUTHORIZED"],
  [403, "FORBIDDEN"],
  [404, "NOT_FOUND"],
  [500, "INTERNAL_SERVER_ERROR"],
  [502, "BAD_GATEWAY"],
]);

export const formatError = (
  formatError: GraphQLFormattedError,
  error: unknown
) => {
  const unwrapError: any = unwrapResolverError(formatError);
  logger.error(unwrapError);

  if (!createError.isHttpError(unwrapError)) {
    rollbar.error(`GraphQL error: ${unwrapError.message}`, { error: unwrapError, formatError});
    return formatError;
  }

  const formattedGraphQLError = {
    ...formatError,
    message: unwrapError.message,
    extentions: {
      ...formatError.extensions,
      code: STATUS_CODES.get(unwrapError.status) || "INTERNAL_SERVER_ERROR",
    },
  };
  rollbar.error(`GraphQL error: ${unwrapError.message}`, {
    error: formattedGraphQLError
  });
  return formattedGraphQLError;
};
