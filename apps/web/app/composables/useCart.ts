import type { Product } from '~/data/products'

export interface CartItem {
  product: Product
  quantity: number
}

const STORAGE_KEY = 'au-parfum-cart'

function persist(items: CartItem[]) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

export function useCart() {
  const items = useState<CartItem[]>('cart', () => [])

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  )

  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  )

  function addItem(product: Product, quantity = 1) {
    const idx = items.value.findIndex(i => i.product.id === product.id)
    if (idx >= 0) {
      const updated = [...items.value]
      updated[idx] = { ...updated[idx], quantity: Math.min(updated[idx].quantity + quantity, 10) }
      items.value = updated
    } else {
      items.value = [...items.value, { product, quantity }]
    }
    persist(items.value)
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return removeItem(productId)
    items.value = items.value.map(i =>
      i.product.id === productId ? { ...i, quantity: Math.min(quantity, 10) } : i,
    )
    persist(items.value)
  }

  function removeItem(productId: string) {
    items.value = items.value.filter(i => i.product.id !== productId)
    persist(items.value)
  }

  function clearCart() {
    items.value = []
    persist(items.value)
  }

  return { items, addItem, updateQuantity, removeItem, clearCart, subtotal, itemCount }
}
