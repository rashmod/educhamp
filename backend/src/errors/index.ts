import BadRequestError from '@/errors/bad-request-error';
import ConflictError from '@/errors/conflict-error';
import ForbiddenError from '@/errors/forbidden-error';
import InternalServerError from '@/errors/internal-server-error';
import NotFoundError from '@/errors/not-found-error';
import TooManyRequests from '@/errors/too-many-requests';
import UnauthorizedError from '@/errors/unauthorized-error';

export default class ErrorFactory {
  static badRequestError(message: string) {
    return new BadRequestError(message);
  }

  static conflictError(message: string) {
    return new ConflictError(message);
  }

  static internalServerError(message: string) {
    return new InternalServerError(message);
  }

  static notFoundError(message: string) {
    return new NotFoundError(message);
  }

  static forbiddenError(message: string) {
    return new ForbiddenError(message);
  }

  static unauthorizedError(message: string) {
    return new UnauthorizedError(message);
  }

  static tooManyRequest(message: string) {
    return new TooManyRequests(message);
  }
}
