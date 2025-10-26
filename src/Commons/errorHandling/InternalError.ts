class InternalError extends Error {
  ErrCode: number;
  constructor(errorPlace: string, message: string, code = 500) {
    super(message);
    this.name = 'InternalError';
    this.ErrCode = code;
  }
}

export default InternalError;
