'use client';

import { useState } from 'react';
import { useWishlists } from '@/hooks/useWishlists';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ListRow } from '@/components/ui/ListRow';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { CreateWishlistModal } from '@/components/modals/CreateWishlistModal';

export default function HomePage() {
  const { wishlists, isLoading, createWishlist, deleteWishlist } = useWishlists();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-textMuted">Загрузка...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
            Мои вишлисты
          </h1>
          <p className="text-base text-textMuted">
            Создавайте списки желаний и делитесь ими с близкими
          </p>
        </div>

        {/* Wishlists */}
        <Card className="p-6 md:p-8">
          <CardHeader
            title="Все списки"
            action={
              <Button onClick={() => setIsModalOpen(true)}>
                + Создать вишлист
              </Button>
            }
          />

          {wishlists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-textMuted mb-4">
                У вас пока нет вишлистов
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Создать первый вишлист
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlists.map((wishlist) => (
                <Link key={wishlist.id} href={`/wishlist/${wishlist.id}`}>
                  <ListRow>
                    <div className="flex items-center justify-center w-12 h-12 bg-surfaceMuted rounded-row text-2xl">
                      {wishlist.emoji || '🎁'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text truncate">
                        {wishlist.title}
                      </h3>
                      <p className="text-sm text-textMuted truncate">
                        {wishlist.items.length} {wishlist.items.length === 1 ? 'желание' : 'желаний'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {wishlist.isPublic && (
                        <Badge variant="default">Публичный</Badge>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (confirm('Удалить вишлист?')) {
                            deleteWishlist(wishlist.id);
                          }
                        }}
                        className="text-textMuted hover:text-danger transition-colors p-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </ListRow>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      <CreateWishlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createWishlist}
      />
    </main>
  );
}
