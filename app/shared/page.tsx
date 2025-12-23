'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeWishlistFromUrl, updateUrlWithWishlist, encodeWishlistToUrl } from '@/lib/wishlistShare';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ListRow } from '@/components/ui/ListRow';
import { Badge } from '@/components/ui/Badge';
import type { Wishlist, WishlistItem } from '@/types/wishlist';
import { ReserveItemModal } from '@/components/modals/ReserveItemModal';

export default function SharedWishlistPage() {
  const searchParams = useSearchParams();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [error, setError] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    const data = searchParams.get('data');
    if (!data) {
      setError('Неверная ссылка');
      return;
    }

    const decoded = decodeWishlistFromUrl(data);
    if (!decoded) {
      setError('Не удалось загрузить вишлист');
      return;
    }

    setWishlist(decoded);
  }, [searchParams]);

  const handleReserve = (itemId: string, reservedBy: string) => {
    if (!wishlist) return;

    const updatedWishlist: Wishlist = {
      ...wishlist,
      items: wishlist.items.map(item =>
        item.id === itemId
          ? { ...item, status: 'reserved' as const, reservedBy }
          : item
      ),
      updatedAt: new Date().toISOString(),
    };

    setWishlist(updatedWishlist);
    updateUrlWithWishlist(updatedWishlist);
  };

  const handleUnreserve = (itemId: string) => {
    if (!wishlist) return;

    const updatedWishlist: Wishlist = {
      ...wishlist,
      items: wishlist.items.map(item =>
        item.id === itemId
          ? { ...item, status: 'wanted' as const, reservedBy: undefined }
          : item
      ),
      updatedAt: new Date().toISOString(),
    };

    setWishlist(updatedWishlist);
    updateUrlWithWishlist(updatedWishlist);
  };

  const copyCurrentLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-danger text-lg mb-4">{error}</p>
          <p className="text-textMuted">Проверьте правильность ссылки</p>
        </div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-textMuted">Загрузка...</p>
      </div>
    );
  }

  const availableItems = wishlist.items.filter(item => item.status === 'wanted');
  const reservedItems = wishlist.items.filter(item => item.status === 'reserved');
  const purchasedItems = wishlist.items.filter(item => item.status === 'purchased');

  return (
    <main className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-6">
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

          <Card className="p-4 bg-surfaceMuted/50">
            <p className="text-sm text-textMuted mb-3">
              👋 Выберите подарок, который хотите подарить, и зарезервируйте его, указав свое имя. 
              Так другие узнают, что этот подарок уже выбран.
            </p>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={copyCurrentLink}
            >
              {showCopySuccess ? '✓ Скопировано!' : '📋 Скопировать актуальную ссылку'}
            </Button>
          </Card>
        </div>

        {/* Available Items */}
        {availableItems.length > 0 && (
          <Card className="p-6 md:p-8 mb-6">
            <CardHeader title={`Доступные подарки (${availableItems.length})`} />
            <div className="space-y-3">
              {availableItems.map((item) => (
                <ListRow key={item.id}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-text">{item.title}</h3>
                      {item.priority === 'high' && (
                        <Badge variant="danger">⭐ Приоритет</Badge>
                      )}
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
                        >
                          Посмотреть товар 🔗
                        </a>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                  >
                    Я подарю это
                  </Button>
                </ListRow>
              ))}
            </div>
          </Card>
        )}

        {/* Reserved Items */}
        {reservedItems.length > 0 && (
          <Card className="p-6 md:p-8 mb-6">
            <CardHeader title={`Зарезервированные (${reservedItems.length})`} />
            <div className="space-y-3">
              {reservedItems.map((item) => (
                <ListRow key={item.id} className="opacity-75">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-text">{item.title}</h3>
                      <Badge variant="warning">
                        Зарезервировано: {item.reservedBy}
                      </Badge>
                    </div>
                    
                    {item.price && (
                      <span className="text-sm text-textMuted">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleUnreserve(item.id)}
                  >
                    Снять резерв
                  </Button>
                </ListRow>
              ))}
            </div>
          </Card>
        )}

        {/* Purchased Items */}
        {purchasedItems.length > 0 && (
          <Card className="p-6 md:p-8">
            <CardHeader title={`Уже подарено (${purchasedItems.length})`} />
            <div className="space-y-3">
              {purchasedItems.map((item) => (
                <ListRow key={item.id} className="opacity-60">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text line-through">
                      {item.title}
                    </h3>
                  </div>
                  <Badge variant="success">✓ Подарено</Badge>
                </ListRow>
              ))}
            </div>
          </Card>
        )}
      </div>

      {selectedItem && (
        <ReserveItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onReserve={(name) => {
            handleReserve(selectedItem.id, name);
            setSelectedItem(null);
          }}
        />
      )}
    </main>
  );
}
