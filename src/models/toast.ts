export type ToastType = 'error' | 'success';

export interface ToastI {
  message: string;
  type: ToastType;
}
