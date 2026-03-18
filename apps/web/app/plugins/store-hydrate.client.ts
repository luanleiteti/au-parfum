export default defineNuxtPlugin(() => {
  try {
    const cartData = localStorage.getItem('au-parfum-cart')
    if (cartData) {
      const cart = useState('cart')
      cart.value = JSON.parse(cartData)
    }
  } catch {}

  try {
    const wishlistData = localStorage.getItem('au-parfum-wishlist')
    if (wishlistData) {
      const wishlist = useState('wishlist')
      wishlist.value = JSON.parse(wishlistData)
    }
  } catch {}
})
