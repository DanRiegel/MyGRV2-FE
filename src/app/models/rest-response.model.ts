export class RestResponse<T> {
  error: boolean;
  message: string;
  payload: T;
}
