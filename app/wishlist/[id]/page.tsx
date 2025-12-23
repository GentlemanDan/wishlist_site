'use client';

import { use, useState } from 'react';
import { useWishlists } from '@/hooks/useWishlists';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ListRow } from '@/components/ui/ListRow';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { AddItemModal } from '@/components/modals/AddItemModal';
import { ShareWishlistModal } from '@/components/modals/ShareWishlistModal';
import type { WishlistItem } from '@/types/wishlist';

const PRIORITY_LABELS = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

const STATUS_LABELS = {
  wanted: 'Желаемое',
  reserved: 'Зарезервировано',
  purchased: 'Куплено',
};

const STATUS_VARIANTS = {
  wanted: 'default' as const,
  reserved: 'warning' as const,
  purchased: 'success' as const,
};

export default function WishlistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { wishlists, addItem, updateItem, deleteItem } = useWishlists();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const wishlist = wishlists.find(w => w.id === id);

  if (!wishlist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-textMuted mb-4">Вишлист не найден</p>
          <Link href="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddItem = (itemData: Omit<WishlistItem, 'id' | 'createdAt'>) => {
    addItem(id, itemData);
  };

  const handleUpdateItem = (itemId: string, data: Partial<WishlistItem>) => {
    updateItem(id, itemId, data);
  };

  return (
    <main className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-container mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-textMuted hover:text-text transition-colors inline-flex items-center gap-2 mb-4">
            ← Назад
          </Link>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-surfaceMuted rounded-card text-4xl">
              {wishlist.emoji || '🎁'}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
                {wishlist.title}
              </h1>
              {wishlist.description && (
                <p className="text-base text-textMuted">
                  {wishlist.description}
                </p>
              )}
            </div>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => setIsShareModalOpen(true)}
            className="w-full md:w-auto"
          >
            📤 Поделиться вишлистом
          </Button>
        </div>

        <Card className="p-6 md:p-8">
          <CardHeader
            title={`Желания (${wishlist.items.length})`}
            action={
              <Button onClick={() => setIsAddModalOpen(true)}>
                + Добавить желание
              </Button>
            }
          />

          {wishlist.items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-textMuted mb-4">
                Пока нет ни одного желания
              </p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                Добавить первое желание
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.items.map((item) => (
                <ListRow key={item.id}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-text">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={STATUS_VARIANTS[item.status]}>
                          {STATUS_LABELS[item.status]}
                        </Badge>
                        {item.priority === 'high' && (
                          <Badge variant="danger">Приоритет</Badge>
                        )}
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="text-sm text-textMuted mb-2">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm">
                      {item.price && (
                        <span className="text-text font-medium">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Ссылка 🔗
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newStatus = item.status === 'wanted' ? 'purchased' : 'wanted';
                        handleUpdateItem(item.id, { status: newStatus });
                      }}
                      className="text-2xl hover:scale-110 transition-transform"
                      title={item.status === 'wanted' ? 'Отметить как купленное' : 'Вернуть в желаемое'}
                    >
                      {item.status === 'purchased' ? '✅' : '⭕'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Удалить это желание?')) {
                          deleteItem(id, item.id);
                        }
                      }}
                      className="text-textMuted hover:text-danger transition-colors p-2"
                    >
                      🗑️
                    </button>
                  </div>
                </ListRow>
              ))}
            </div>
          )}
        </Card>
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {isShareModalOpen && (
        <ShareWishlistModal
          wishlist={wishlist}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </main>
  );
}
