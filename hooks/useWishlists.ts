'use client';

import { useState, useEffect } from 'react';
import type { Wishlist, WishlistItem } from '@/types/wishlist';

const STORAGE_KEY = 'wishlists';

export function useWishlists() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWishlists(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse wishlists:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const saveWishlists = (newWishlists: Wishlist[]) => {
    setWishlists(newWishlists);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWishlists));
  };

  const createWishlist = (data: { title: string; description?: string; emoji?: string; isPublic: boolean }) => {
    const newWishlist: Wishlist = {
      id: crypto.randomUUID(),
      ...data,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveWishlists([...wishlists, newWishlist]);
    return newWishlist;
  };

  const updateWishlist = (id: string, data: Partial<Wishlist>) => {
    const updated = wishlists.map(w => 
      w.id === id 
        ? { ...w, ...data, updatedAt: new Date().toISOString() }
        : w
    );
    saveWishlists(updated);
  };

  const deleteWishlist = (id: string) => {
    saveWishlists(wishlists.filter(w => w.id !== id));
  };

  const addItem = (wishlistId: string, itemData: Omit<WishlistItem, 'id' | 'createdAt'>) => {
    const newItem: WishlistItem = {
      id: crypto.randomUUID(),
      ...itemData,
      createdAt: new Date().toISOString(),
    };

    const updated = wishlists.map(w =>
      w.id === wishlistId
        ? { 
            ...w, 
            items: [...w.items, newItem],
            updatedAt: new Date().toISOString()
          }
        : w
    );
    saveWishlists(updated);
    return newItem;
  };

  const updateItem = (wishlistId: string, itemId: string, data: Partial<WishlistItem>) => {
    const updated = wishlists.map(w =>
      w.id === wishlistId
        ? {
            ...w,
            items: w.items.map(item =>
              item.id === itemId ? { ...item, ...data } : item
            ),
            updatedAt: new Date().toISOString()
          }
        : w
    );
    saveWishlists(updated);
  };

  const deleteItem = (wishlistId: string, itemId: string) => {
    const updated = wishlists.map(w =>
      w.id === wishlistId
        ? {
            ...w,
            items: w.items.filter(item => item.id !== itemId),
            updatedAt: new Date().toISOString()
          }
        : w
    );
    saveWishlists(updated);
  };

  return {
    wishlists,
    isLoading,
    createWishlist,
    updateWishlist,
    deleteWishlist,
    addItem,
    updateItem,
    deleteItem,
  };
}
