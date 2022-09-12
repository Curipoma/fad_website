import { PaginatorModel } from '@models/core';

export interface ServerResponse<T> {
  data: T;
  pagination?: PaginatorModel;
  error?: string;
  message: string;
  statusCode: number;
  title: string;
}

export interface ServerResponsePaginator<T> extends ServerResponse<T> {
  meta: PaginatorModel;
  links?: Links;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
