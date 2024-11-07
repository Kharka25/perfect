import {clientRequest} from '@config/api';
import {EndPoints} from '@config/endpoint';
import {RequestMethodEnum} from '@models/requests';

export async function uploadCat(file: string) {
  return await clientRequest({
    data: {file},
    endpoint: EndPoints.UPLOAD_CAT,
    methodType: RequestMethodEnum.POST,
  });
}

export async function getCatImages() {
  return await clientRequest({
    endpoint: `${EndPoints.LIST_CATS}?limit=10`,
    methodType: RequestMethodEnum.GET,
  });
}
