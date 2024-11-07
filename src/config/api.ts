import {RequestConfig, RequestMethodEnum} from '@models/requests';
import Axios, {isAxiosError} from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

function requestClient() {
  return Axios.create({
    baseURL: BASE_URL,
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

    if (errorResponse) {
      errorMessage = {
        message: error.response?.data,
        status: error.response?.status,
      };
    }
  }

  return errorMessage;
}
