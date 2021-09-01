export class AppError extends Error {
  public override readonly message: string

  public readonly statusCode: number

  constructor (message: string, statusCode = 400) {
    super(message)
    this.message = message
    this.name = 'DefaultAppError'
    this.statusCode = statusCode
  }
}
