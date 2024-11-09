import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ToastI} from '@models/toast';
import {RootState} from '@store/store';

const initialState: ToastI = {
  message: '',
  type: 'success',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastMessage(state, {payload}: PayloadAction<ToastI>) {
      state.message = payload.message;
      state.type = payload.type;
    },
  },
});

export const {setToastMessage} = toastSlice.actions;

export const getToastState = createSelector(
  (state: RootState) => state,
  ({toast}) => toast,
);

export default toastSlice.reducer;
