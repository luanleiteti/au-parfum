import type { Product } from '~/data/products'

const STORAGE_KEY = 'au-parfum-wishlist'

function persist(items: Product[]) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

export function useWishlist() {
  const items = useState<Product[]>('wishlist', () => [])

  function addItem(product: Product) {
    if (!items.value.some(i => i.id === product.id)) {
      items.value = [...items.value, product]
      persist(items.value)
    }
  }

  function removeItem(productId: string) {
    items.value = items.value.filter(i => i.id !== productId)
    persist(items.value)
  }

  function isInWishlist(productId: string): boolean {
    return items.value.some(i => i.id === productId)
  }

  function clearWishlist() {
    items.value = []
    persist(items.value)
  }

  return { items, addItem, removeItem, isInWishlist, clearWishlist }
}
