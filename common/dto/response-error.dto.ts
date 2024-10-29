export class ResponseErrorDto {
  status: number;
  error: string;
  message?: string[];

  constructor(status: number, error: string, message?: string[]) {
    this.status = status;
    this.error = error;
    this.message = message;
  }
}