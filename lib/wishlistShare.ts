import type { Wishlist } from '@/types/wishlist';

// Сериализация вишлиста в URL-safe строку
export function encodeWishlistToUrl(wishlist: Wishlist): string {
  try {
    const json = JSON.stringify(wishlist);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error('Failed to encode wishlist:', error);
    return '';
  }
}

// Десериализация вишлиста из URL-safe строки
export function decodeWishlistFromUrl(encoded: string): Wishlist | null {
  try {
    // Добавляем обратно padding
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json) as Wishlist;
  } catch (error) {
    console.error('Failed to decode wishlist:', error);
    return null;
  }
}

// Генерация публичной ссылки
export function generatePublicLink(wishlist: Wishlist, baseUrl: string = ''): string {
  const encoded = encodeWishlistToUrl(wishlist);
  return `${baseUrl}/shared?data=${encoded}`;
}

// Обновление URL с новыми данными (после резервирования)
export function updateUrlWithWishlist(wishlist: Wishlist): void {
  const encoded = encodeWishlistToUrl(wishlist);
  const url = new URL(window.location.href);
  url.searchParams.set('data', encoded);
  window.history.replaceState({}, '', url.toString());
}
