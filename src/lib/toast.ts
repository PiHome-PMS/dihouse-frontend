import { toast as sonnerToast } from 'sonner';

/**
 * Toast notification helpers with consistent styling
 */
export const toast = {
  /**
   * Success notification
   */
  success: (message: string, description?: string) => {
    sonnerToast.success(message, { description });
  },

  /**
   * Error notification
   */
  error: (message: string, description?: string) => {
    sonnerToast.error(message, { description });
  },

  /**
   * Warning notification
   */
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, { description });
  },

  /**
   * Info notification
   */
  info: (message: string, description?: string) => {
    sonnerToast.info(message, { description });
  },

  /**
   * Loading notification - returns dismiss function
   */
  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  /**
   * Promise-based toast for async operations
   * @example
   * toast.promise(saveData(), {
   *   loading: 'Đang lưu...',
   *   success: 'Đã lưu thành công',
   *   error: 'Lưu thất bại'
   * });
   */
  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) => {
    return sonnerToast.promise(promise, messages);
  },

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};
