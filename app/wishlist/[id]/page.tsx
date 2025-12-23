import { WishlistPageClient } from './WishlistPageClient';

// Для статического экспорта - генерируем пустой список
export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default function WishlistPage({ params }: { params: Promise<{ id: string }> }) {
  return <WishlistPageClient params={params} />;
}
