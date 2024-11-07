export enum RequestMethodEnum {
  DELETE = 'delete',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

export type RequestConfig<T> = {
  data?: T;
  endpoint: string;
  methodType: RequestMethodEnum;
};
