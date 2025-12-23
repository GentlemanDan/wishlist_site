'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

interface CreateWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { title: string; description?: string; emoji?: string; isPublic: boolean }) => void;
}

const EMOJI_OPTIONS = ['🎁', '🎂', '🎄', '💝', '🎉', '⭐', '✨', '🌟', '💫', '🎈'];

export function CreateWishlistModal({ isOpen, onClose, onCreate }: CreateWishlistModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🎁');
  const [isPublic, setIsPublic] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      description: description.trim() || undefined,
      emoji,
      isPublic,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setEmoji('🎁');
    setIsPublic(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-accent/20 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-card shadow-e2 w-full max-w-md p-6 md:p-8">
        <h2 className="text-2xl font-bold text-text mb-6">Новый вишлист</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Emoji Picker */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Иконка
            </label>
            <div className="flex gap-2 flex-wrap">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`
                    w-12 h-12 rounded-row text-2xl
                    transition-all duration-smooth
                    ${emoji === e 
                      ? 'bg-accentSoft ring-2 ring-accent' 
                      : 'bg-surfaceMuted hover:bg-accentSoft'
                    }
                  `}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Мой день рождения"
            required
          />

          <Textarea
            label="Описание (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Добавьте описание..."
            rows={3}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
            />
            <label htmlFor="isPublic" className="text-sm text-text cursor-pointer">
              Сделать публичным (можно будет поделиться)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="flex-1">
              Создать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
