import {clientRequest} from '@config/api';
import {EndPoints} from '@config/endpoint';
import {ImageData} from '@models/navigation';
import {CatRequestI, RequestMethodEnum} from '@models/requests';

interface FavouritePayload {
  data?: CatRequestI;
  favouriteId?: string;
}

export async function uploadCat(fileData: ImageData) {
  const formData = new FormData();

  formData.append('file', {
    name: fileData.name,
    type: fileData.type,
    uri: fileData.uri,
  });

  return await clientRequest({
    endpoint: EndPoints.UPLOAD_CAT,
    contentType: 'multipart/form-data',
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

export async function toggleFavorite(payload: FavouritePayload) {
  const {data, favouriteId} = payload;
  if (!favouriteId) {
    return await clientRequest({
      endpoint: EndPoints.FAVORITE_CAT,
      data,
      methodType: RequestMethodEnum.POST,
    });
  } else {
    return await clientRequest({
      endpoint: `${EndPoints.FAVORITE_CAT}/${favouriteId}`,
      methodType: RequestMethodEnum.DELETE,
    });
  }
}

export async function voteCat(payload: CatRequestI) {
  return await clientRequest({
    endpoint: EndPoints.VOTE_CAT,
    data: payload,
    methodType: RequestMethodEnum.POST,
  });
}
