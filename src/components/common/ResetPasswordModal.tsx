import { Button, Input } from '@/components/ui';
import { Key, X } from 'lucide-react';
import { useState } from 'react';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newPassword: string) => void;
  userName: string;
}

/**
 * Reset password modal for staff
 */
export function ResetPasswordModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: ResetPasswordModalProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!password) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    onConfirm(password);
    setPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Modal backdrop click to close */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Key className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Đổi mật khẩu</h3>
              <p className="text-xs text-gray-500">{userName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-semibold text-gray-700">
              Mật khẩu mới <span className="text-red-500">*</span>
            </span>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Nhập mật khẩu mới"
              className="h-10 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-gray-700">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </span>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              placeholder="Nhập lại mật khẩu mới"
              className="h-10 rounded-md"
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
          <Button variant="outline" onClick={handleClose} className="px-6 h-10 rounded-md">
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 h-10 rounded-md bg-primary hover:bg-primary/90"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
