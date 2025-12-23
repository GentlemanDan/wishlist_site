'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { generatePublicLink } from '@/lib/wishlistShare';
import type { Wishlist } from '@/types/wishlist';

interface ShareWishlistModalProps {
  wishlist: Wishlist;
  onClose: () => void;
}

export function ShareWishlistModal({ wishlist, onClose }: ShareWishlistModalProps) {
  const [copied, setCopied] = useState(false);
  const publicLink = generatePublicLink(wishlist, typeof window !== 'undefined' ? window.location.origin : '');

  const handleCopy = () => {
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-accent/20 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-card shadow-e2 w-full max-w-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-text mb-4">Поделиться вишлистом</h2>

        <div className="space-y-4 mb-6">
          <p className="text-textMuted">
            Отправьте эту ссылку друзьям и близким. Они смогут посмотреть список подарков 
            и зарезервировать то, что хотят подарить вам.
          </p>

          <div className="p-4 bg-surfaceMuted rounded-input border border-border">
            <p className="text-xs text-textMuted mb-2">Публичная ссылка:</p>
            <p className="text-sm text-text break-all font-mono">
              {publicLink}
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCopy} className="flex-1">
              {copied ? '✓ Скопировано!' : '📋 Скопировать ссылку'}
            </Button>
          </div>
        </div>

        <div className="p-4 bg-accentSoft rounded-row">
          <p className="text-sm text-textMuted">
            💡 <strong>Важно:</strong> Когда кто-то зарезервирует подарок, ему нужно будет 
            скопировать обновленную ссылку и отправить её остальным участникам.
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
}
