import { useEffect, useRef } from 'react';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile menu overlay - closes sidebar when clicked or Escape pressed
 * Keyboard accessible with proper focus management
 */
export function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Auto-focus overlay when opened for keyboard accessibility
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-30 bg-black/50 lg:hidden"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Đóng menu"
    />
  );
}
