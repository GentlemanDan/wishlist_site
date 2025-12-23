'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { WishlistItem } from '@/types/wishlist';

interface ReserveItemModalProps {
  item: WishlistItem;
  onClose: () => void;
  onReserve: (name: string) => void;
}

export function ReserveItemModal({ item, onClose, onReserve }: ReserveItemModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onReserve(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-accent/20 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-card shadow-e2 w-full max-w-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-text mb-4">Зарезервировать подарок</h2>

        <div className="mb-6 p-4 bg-surfaceMuted rounded-row">
          <p className="font-semibold text-text mb-1">{item.title}</p>
          {item.price && (
            <p className="text-sm text-textMuted">
              {item.price.toLocaleString('ru-RU')} ₽
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Иван"
            required
            autoFocus
          />

          <p className="text-sm text-textMuted">
            После резервирования не забудьте скопировать и отправить обновленную ссылку другим участникам!
          </p>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              Зарезервировать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
