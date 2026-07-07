/**
 * Reference: https://docs.stripe.com/api/authentication
 * @OK 200: Everything worked as expected.
 * @BAD_REQ 400: The request was unacceptable, often due to missing a required parameter.
 * @UNAUTHORIZED 401: No valid API key provided.
 * @REQ_FAILED 402: The parameters were valid but the request failed.
 * @FORBIDDEN 403: The API key doesn’t have permissions to perform the request.
 * @NOT_FOUND 404: The requested resource doesn’t exist.
 * @CONFLICT 409: The request conflicts with another request (perhaps due to using the same idempotent key).
 * @EXT_DEP_FAIL 424: The request couldn’t be completed due to a failure in a dependency external to Stripe.
 * @TOO_MANY_REQ 429: Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.
 * @SERVER_ERR 500 | 502 | 503 | 504: Something went wrong on Stripe’s end. (These are rare.)
 */
export enum StripeResponseCodes {
    OK = 200,
    BAD_REQ = 400,
    UNAUTHORIZED = 401,
    REQ_FAILED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    EXT_DEP_FAIL = 424,
    TOO_MANY_REQ = 429,
    SERVER_ERR_00 = 500,
    SERVER_ERR_02 = 502,
    SERVER_ERR_03 = 503,
    SERVER_ERR_04 = 504
}