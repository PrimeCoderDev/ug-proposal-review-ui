export interface IResponse {
  token?: string;
  status: string;
  statusCode: number;
  message?: string;
  data: any;
}
