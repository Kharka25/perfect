import Axios, {CreateAxiosDefaults, isAxiosError} from 'axios';

import {API_KEY, BASE_URL} from '@env';
import {RequestConfig, RequestMethodEnum} from '@models/requests';

type headers = CreateAxiosDefaults['headers'];

function requestClient(headers?: headers) {
  const defaultHeaders = {
    'x-api-key': API_KEY,
    'Content-Type': 'multipart/form-data',
    ...headers,
  };

  return Axios.create({
    baseURL: BASE_URL,
    headers: defaultHeaders,
  });
}

export async function clientRequest<T>(requestConfig: RequestConfig<T>) {
  const apiIntegration = requestClient();
  let response;
  try {
    switch (requestConfig.methodType) {
      case RequestMethodEnum.DELETE:
        response = await apiIntegration.delete(requestConfig.endpoint);
        break;
      case RequestMethodEnum.GET:
        response = await apiIntegration.get(requestConfig.endpoint);
        return {data: response.data, status: response.status};
      case RequestMethodEnum.POST:
        response = await apiIntegration.post(
          requestConfig.endpoint,
          requestConfig.data,
        );
        return {data: response.data, status: response.status};
      case RequestMethodEnum.PUT:
        response = await apiIntegration.put(
          requestConfig.endpoint,
          requestConfig.data,
        );
        return response.data;
      default:
        return response;
    }
  } catch (error) {
    return catchAsyncError(error);
  }
}

export function catchAsyncError(error: any): string {
  let errorMessage = error.message;
  if (isAxiosError(error)) {
    const errorResponse = error.response?.data;
    console.log(errorResponse, 'ERROR RESPONSE');

    if (errorResponse) {
      errorMessage = {
        message: error.response?.data,
        status: error.response?.status,
      };
    }
  }

  return errorMessage;
}
