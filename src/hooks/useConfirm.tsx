import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import { useCallback, useState } from 'react';

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

/**
 * Hook for confirmation dialogs
 * @example
 * const { confirm, ConfirmDialog } = useConfirm();
 *
 * const handleDelete = async () => {
 *   const confirmed = await confirm({
 *     title: 'Xóa mục này?',
 *     description: 'Hành động này không thể hoàn tác.',
 *     variant: 'destructive'
 *   });
 *   if (confirmed) { ... }
 * };
 *
 * return <><YourContent /><ConfirmDialog /></>;
 */
export function useConfirm() {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    resolve: null,
    title: 'Xác nhận',
    description: 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText: 'Xác nhận',
    cancelText: 'Hủy',
    variant: 'default',
  });

  const confirm = useCallback((options?: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        resolve,
        title: options?.title ?? 'Xác nhận',
        description: options?.description ?? 'Bạn có chắc chắn muốn thực hiện hành động này?',
        confirmText: options?.confirmText ?? 'Xác nhận',
        cancelText: options?.cancelText ?? 'Hủy',
        variant: options?.variant ?? 'default',
      });
    });
  }, []);

  // Fix: Read resolve from current state to avoid stale closure
  const handleConfirm = useCallback(() => {
    setState((prev) => {
      prev.resolve?.(true);
      return { ...prev, isOpen: false, resolve: null };
    });
  }, []);

  const handleCancel = useCallback(() => {
    setState((prev) => {
      prev.resolve?.(false);
      return { ...prev, isOpen: false, resolve: null };
    });
  }, []);

  const ConfirmDialog = useCallback(
    () => (
      <Dialog open={state.isOpen} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.title}</DialogTitle>
            <DialogDescription>{state.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              {state.cancelText}
            </Button>
            <Button
              variant={state.variant === 'destructive' ? 'destructive' : 'default'}
              onClick={handleConfirm}
            >
              {state.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    [state, handleConfirm, handleCancel]
  );

  return { confirm, ConfirmDialog };
}
