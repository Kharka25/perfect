import {clientRequest} from '@config/api';
import {EndPoints} from '@config/endpoint';
import {ImageData} from '@models/navigation';
import {RequestMethodEnum} from '@models/requests';

export async function uploadCat(fileData: ImageData) {
  const formData = new FormData();
  formData.append('file', {
    name: fileData.name,
    type: fileData.type,
    uri: fileData.uri,
  });
  return await clientRequest({
    endpoint: EndPoints.UPLOAD_CAT,
    data: formData,
    methodType: RequestMethodEnum.POST,
  });
}

export async function getCatImages() {
  return await clientRequest({
    endpoint: `${EndPoints.LIST_CATS}?limit=10`,
    methodType: RequestMethodEnum.GET,
  });
}
