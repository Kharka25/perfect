import {useAppDispatch, useAppSelector} from '@store/hooks';
import {ToastI} from '@models/toast';
import {getToastState, setToastMessage} from './toast';

function useToast() {
  const dispatch = useAppDispatch();
  const toastState = useAppSelector(getToastState);

  function updateToast(value: ToastI) {
    dispatch(setToastMessage(value));
  }

  return {toastState, updateToast};
}

export default useToast;
