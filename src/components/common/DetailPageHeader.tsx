import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

interface DetailPageHeaderProps {
  title: string;
  onBack: () => void;
}

/**
 * Page header with back button for detail/insert pages
 */
export function DetailPageHeader({ title, onBack }: DetailPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold text-gray-700 uppercase">{title}</h1>
      </div>
    </div>
  );
}
