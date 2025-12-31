import { Button } from '@/components/ui';
import { Upload, X } from 'lucide-react';

interface SignatureUploadProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
}

/**
 * Signature upload component for Department forms
 */
export function SignatureUpload({ value, onChange }: SignatureUploadProps) {
  const handleUpload = () => {
    // TODO: Implement file upload logic
    console.log('Upload signature');
  };

  const handleRemove = () => {
    onChange?.(null);
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-bold text-gray-700">Chữ ký</span>
      <div className="flex items-center gap-4">
        <div className="h-24 w-48 border-2 border-dashed border-gray-200 rounded-[3px] flex items-center justify-center bg-gray-50">
          {value ? (
            <img src={value} alt="Signature" className="max-h-full max-w-full" />
          ) : (
            <span className="text-xs text-gray-400">Chưa có chữ ký</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={handleUpload}
          >
            <Upload className="h-3 w-3" />
            Chọn
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 text-xs text-red-500 hover:text-red-600"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}
