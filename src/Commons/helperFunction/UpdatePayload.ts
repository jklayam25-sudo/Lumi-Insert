import InvariantError from '../errorHandling/InvariantError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatePayload(fieldName: string, toCheck: any, type: string) {
  if (toCheck === undefined) return;
  if (toCheck === null) throw new InvariantError(`Bad Request: ${fieldName} must not null!`);
  if (toCheck && typeof toCheck !== type) {
    throw new InvariantError(`Bad Request: ${fieldName} does not meet type specification`);
  }
  if (typeof toCheck === 'string' && toCheck.trim() === '') {
    throw new InvariantError(`Bad Request: ${fieldName} must not empty!`);
  }
}
