class AuthenticationError extends Error {
  ErrCode: number;
  constructor(message: string, code = 401) {
    super(message);
    this.name = 'AuthenticationError';
    this.ErrCode = code;
  }
}

export default AuthenticationError;
