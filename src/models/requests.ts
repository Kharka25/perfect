export enum RequestMethodEnum {
  DELETE = 'delete',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

export type RequestConfig<T> = {
  contentType?: string;
  data?: T;
  endpoint: string;
  methodType: RequestMethodEnum;
};

export interface FavouriteCatI {
  image_id: string;
  sub_id?: string;
}
