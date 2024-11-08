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

export interface CatRequestI {
  image_id: string;
  sub_id?: string;
  value?: number;
}

export enum VoteType {
  DOWN_VOTE = 'down-vote',
  UP_VOTE = 'up-vote',
}
