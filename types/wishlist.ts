export interface WishlistItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
  link?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'wanted' | 'reserved' | 'purchased';
  reservedBy?: string; // Имя человека, который зарезервировал
  imageUrl?: string;
  createdAt: string;
}

export interface Wishlist {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
  items: WishlistItem[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export type WishlistFormData = Omit<Wishlist, 'id' | 'items' | 'createdAt' | 'updatedAt'>;
export type ItemFormData = Omit<WishlistItem, 'id' | 'createdAt'>;
