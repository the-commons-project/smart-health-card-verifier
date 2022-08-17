import type { ErrorCode } from '../constants/error'

export class InvalidError extends Error {
  errorCode: ErrorCode
  constructor ( errorCode: ErrorCode ) {
    super()
    this.errorCode = errorCode
  }
}
