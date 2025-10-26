import { StatusCode } from 'hono/utils/http-status';

class InvariantError extends Error {
  ErrCode: number;
  constructor(message: string, code = 400) {
    super(message);
    this.name = 'InvariantError';
    this.ErrCode = code as StatusCode;
  }
}

export default InvariantError;
