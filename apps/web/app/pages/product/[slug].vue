<script setup lang="ts">
import { getProductBySlug, getRelatedProducts, collections } from '~/data/products'

const route = useRoute()
const toast = useToast()
const slug = computed(() => route.params.slug as string)
const product = computed(() => getProductBySlug(slug.value))
const relatedProducts = computed(() => product.value ? getRelatedProducts(product.value.id) : [])
const collection = computed(() => product.value ? collections.find(c => c.id === product.value!.collection) : null)

const currentImageIndex = ref(0)
const quantity = ref(1)

const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
const { addItem: addToCart } = useCart()

const inWishlist = computed(() => product.value ? isInWishlist(product.value.id) : false)

function toggleWishlist() {
  if (!product.value) return
  if (inWishlist.value) {
    removeFromWishlist(product.value.id)
    toast.add({ title: 'Removido da lista de desejos', description: `${product.value.name} foi removido.`, color: 'neutral' })
  } else {
    addToWishlist(product.value)
    toast.add({ title: 'Adicionado à lista de desejos', description: `${product.value.name} foi salvo.`, color: 'success' })
  }
}

function handleAddToCart() {
  if (!product.value) return
  addToCart(product.value, quantity.value)
  toast.add({ title: 'Adicionado à sacola', description: `${quantity.value} × ${product.value.name} adicionado.`, color: 'success' })
  quantity.value = 1
}

function prevImage() {
  if (!product.value) return
  currentImageIndex.value = currentImageIndex.value === 0
    ? product.value.images.length - 1
    : currentImageIndex.value - 1
}

function nextImage() {
  if (!product.value) return
  currentImageIndex.value = currentImageIndex.value === product.value.images.length - 1
    ? 0
    : currentImageIndex.value + 1
}

watch(slug, () => {
  currentImageIndex.value = 0
  quantity.value = 1
})

useHead({
  title: computed(() => product.value ? `${product.value.name} — Au Parfum` : 'Produto não encontrado'),
})
</script>

<template>
  <!-- Not Found -->
  <div v-if="!product" class="container-wide py-28 text-center">
    <h1 class="font-serif text-4xl mb-4">Produto não encontrado</h1>
    <p class="text-muted mb-8">O produto que você procura não existe.</p>
    <UButton to="/products" class="px-8 text-sm tracking-[0.1em] uppercase">
      Ver Produtos
    </UButton>
  </div>

  <template v-else>
    <!-- Breadcrumb -->
    <div class="container-full py-6 border-b border-default">
      <UBreadcrumb
        :items="[
          { label: 'Loja', to: '/products' },
          ...(collection ? [{ label: collection.name, to: `/products?collection=${collection.slug}` }] : []),
          { label: product.name },
        ]"
      />
    </div>

    <!-- Product Content -->
    <section class="py-10 md:py-16">
      <div class="container-full">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <!-- Image Gallery -->
          <div class="lg:col-span-7 space-y-4">
            <div class="relative aspect-[4/5] overflow-hidden bg-muted group">
              <Transition
                enter-active-class="transition-opacity duration-500"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                mode="out-in"
              >
                <img
                  :key="currentImageIndex"
                  :src="product.images[currentImageIndex]"
                  :alt="product.name"
                  class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                >
              </Transition>

              <template v-if="product.images.length > 1">
                <button
                  @click="prevImage"
                  class="absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-default/90 backdrop-blur-md hover:bg-default transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                >
                  <UIcon name="i-lucide-chevron-left" class="size-5" />
                </button>
                <button
                  @click="nextImage"
                  class="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-default/90 backdrop-blur-md hover:bg-default transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                >
                  <UIcon name="i-lucide-chevron-right" class="size-5" />
                </button>

                <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  <button
                    v-for="(_, index) in product.images"
                    :key="index"
                    @click="currentImageIndex = index"
                    class="w-8 h-0.5 transition-all duration-500"
                    :class="index === currentImageIndex ? 'bg-highlighted' : 'bg-highlighted/20 hover:bg-highlighted/40'"
                  />
                </div>
              </template>

              <div class="absolute top-5 left-5 flex flex-col gap-2">
                <span
                  v-if="product.new"
                  class="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-inverted text-inverted"
                >
                  Novo
                </span>
              </div>
            </div>

            <div v-if="product.images.length > 1" class="flex gap-3">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="currentImageIndex = index"
                class="w-24 h-24 overflow-hidden transition-all duration-300"
                :class="index === currentImageIndex
                  ? 'ring-2 ring-highlighted ring-offset-2 ring-offset-[var(--ui-bg)]'
                  : 'opacity-60 hover:opacity-100'"
              >
                <img :src="image" :alt="`${product.name} view ${index + 1}`" class="w-full h-full object-cover">
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="lg:col-span-5 lg:sticky lg:top-28 lg:self-start animate-fade-in-up" style="animation-delay: 0.2s">
            <NuxtLink
              v-if="collection"
              :to="`/products?collection=${collection.slug}`"
              class="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5 hover:text-primary/80 transition-colors"
            >
              {{ collection.name }}
            </NuxtLink>

            <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl text-highlighted mb-5 leading-[1.05]">
              {{ product.name }}
            </h1>

            <p class="text-2xl font-serif text-highlighted mb-8">
              {{ formatPrice(product.price) }}
            </p>

            <div class="w-12 h-px bg-[var(--ui-border)] mb-8" />

            <p class="text-muted leading-[1.8] mb-10">
              {{ product.longDescription }}
            </p>

            <!-- Details -->
            <div class="space-y-5 mb-10 pb-10 border-b border-default">
              <div>
                <span class="text-[11px] font-semibold tracking-[0.2em] uppercase text-dimmed block mb-1.5">
                  Especificações
                </span>
                <span class="text-sm text-highlighted">{{ product.materials }}</span>
              </div>
              <div v-if="product.dimensions">
                <span class="text-[11px] font-semibold tracking-[0.2em] uppercase text-dimmed block mb-1.5">
                  Tamanho
                </span>
                <span class="text-sm text-highlighted">{{ product.dimensions }}</span>
              </div>
            </div>

            <!-- Quantity -->
            <div class="mb-6">
              <span class="text-[11px] font-semibold tracking-[0.2em] uppercase text-dimmed block mb-3">
                Quantidade
              </span>
              <QuantitySelector v-model="quantity" />
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3">
              <UButton
                size="xl"
                icon="i-lucide-shopping-bag"
                class="w-full text-sm tracking-[0.15em] uppercase btn-premium"
                @click="handleAddToCart"
              >
                Adicionar à Sacola
              </UButton>
              <UButton
                size="xl"
                variant="outline"
                color="neutral"
                :icon="inWishlist ? 'i-lucide-heart' : 'i-lucide-heart'"
                class="w-full text-sm tracking-[0.1em] uppercase"
                @click="toggleWishlist"
              >
                {{ inWishlist ? 'Salvo na Lista de Desejos' : 'Adicionar à Lista de Desejos' }}
              </UButton>
            </div>

            <!-- Trust signals -->
            <div class="mt-10 pt-8 border-t border-default grid grid-cols-2 gap-6">
              <div>
                <p class="text-[11px] font-semibold tracking-[0.15em] uppercase text-dimmed mb-1">
                  Envio
                </p>
                <p class="text-xs text-muted">Frete grátis acima de R$ 500</p>
              </div>
              <div>
                <p class="text-[11px] font-semibold tracking-[0.15em] uppercase text-dimmed mb-1">
                  Devoluções
                </p>
                <p class="text-xs text-muted">Política de 14 dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section v-if="relatedProducts.length > 0" class="py-20 md:py-28 bg-linen">
      <div class="container-full">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Você Também Pode Gostar
            </p>
            <h2 class="font-serif text-3xl md:text-4xl text-highlighted">
              Mais de {{ collection?.name }}
            </h2>
          </div>
          <NuxtLink
            v-if="collection"
            :to="`/products?collection=${collection.slug}`"
            class="hidden md:flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-muted hover:text-highlighted transition-colors"
          >
            Ver Todos
            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <ProductCard
            v-for="(relProduct, index) in relatedProducts"
            :key="relProduct.id"
            :product="relProduct"
            :index="index"
          />
        </div>
      </div>
    </section>
  </template>
</template>
