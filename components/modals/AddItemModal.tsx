'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import type { WishlistItem } from '@/types/wishlist';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<WishlistItem, 'id' | 'createdAt'>) => void;
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      price: price ? parseFloat(price) : undefined,
      link: link.trim() || undefined,
      priority,
      status: 'wanted',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setLink('');
    setPriority('medium');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-accent/20 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-card shadow-e2 w-full max-w-md p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-text mb-6">Новое желание</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: iPhone 15 Pro"
            required
          />

          <Textarea
            label="Описание (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Добавьте детали..."
            rows={3}
          />

          <Input
            label="Цена (необязательно)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
          />

          <Input
            label="Ссылка (необязательно)"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
          />

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Приоритет
            </label>
            <div className="flex gap-2">
              {[
                { value: 'low', label: 'Низкий', emoji: '🟢' },
                { value: 'medium', label: 'Средний', emoji: '🟡' },
                { value: 'high', label: 'Высокий', emoji: '🔴' },
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value as any)}
                  className={`
                    flex-1 px-4 py-2.5 rounded-input text-sm font-medium
                    transition-all duration-smooth
                    ${priority === p.value
                      ? 'bg-accentSoft border-2 border-accent text-text'
                      : 'bg-surfaceMuted border border-border text-textMuted hover:bg-accentSoft'
                    }
                  `}
                >
                  {p.emoji} {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
