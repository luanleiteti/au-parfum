<script setup lang="ts">
import { products, collections, getCollectionBySlug } from '~/data/products'

const route = useRoute()
const router = useRouter()

const activeCollection = computed(() => (route.query.collection as string) || 'all')
const activeSort = computed(() => (route.query.sort as string) || 'featured')

const currentCollection = computed(() =>
  activeCollection.value !== 'all' ? getCollectionBySlug(activeCollection.value) : null,
)

const sortOptions = [
  { label: 'Destaques', value: 'featured' },
  { label: 'Novidades', value: 'newest' },
  { label: 'Menor Preço', value: 'price-asc' },
  { label: 'Maior Preço', value: 'price-desc' },
  { label: 'A-Z', value: 'name-asc' },
]

const filteredAndSortedProducts = computed(() => {
  let result = [...products]

  if (activeCollection.value !== 'all') {
    const collection = collections.find(c => c.slug === activeCollection.value)
    if (collection) {
      result = result.filter(p => p.collection === collection.id)
    }
  }

  switch (activeSort.value) {
    case 'newest':
      result = result.filter(p => p.new).concat(result.filter(p => !p.new))
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      result = result.filter(p => p.featured).concat(result.filter(p => !p.featured))
      break
  }

  return result
})

function handleFilterChange(slug: string) {
  const query = { ...route.query }
  if (slug === 'all') {
    delete query.collection
  } else {
    query.collection = slug
  }
  router.push({ query })
}

function handleSortChange(value: string) {
  const query = { ...route.query }
  if (value === 'featured') {
    delete query.sort
  } else {
    query.sort = value
  }
  router.push({ query })
}

useHead({
  title: computed(() => currentCollection.value
    ? `${currentCollection.value.name} — Au Parfum`
    : 'Produtos — Au Parfum'),
})
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[40vh] md:h-[55vh] overflow-hidden -mt-[var(--ui-header-height)]">
    <div class="absolute inset-0">
      <img
        :src="currentCollection?.heroImage || 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&q=80'"
        :alt="currentCollection?.name || 'Todos os Produtos'"
        class="w-full h-full object-cover transition-opacity duration-700"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-charcoal/10" />
    </div>

    <div class="relative container-full h-full flex flex-col justify-end pb-12 md:pb-16">
      <div class="animate-fade-in-up">
        <p class="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50 mb-3">
          {{ currentCollection ? 'Categoria' : 'Loja' }}
        </p>
        <h1 class="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3 leading-[0.95]">
          {{ currentCollection ? currentCollection.name : 'Todos os Produtos' }}
        </h1>
        <p v-if="currentCollection" class="text-base text-white/70 max-w-lg">
          {{ currentCollection.description }}
        </p>
      </div>
    </div>
  </section>

  <!-- Filters & Sorting -->
  <section class="py-5 border-b border-default sticky top-[var(--ui-header-height)] bg-default/95 backdrop-blur-md z-40">
    <div class="container-full">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mb-2 md:mb-0">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            class="whitespace-nowrap text-xs tracking-[0.1em] uppercase"
            :class="activeCollection === 'all' && 'bg-inverted text-inverted hover:bg-inverted/90'"
            @click="handleFilterChange('all')"
          >
            Todos
          </UButton>
          <UButton
            v-for="collection in collections"
            :key="collection.id"
            variant="ghost"
            color="neutral"
            size="sm"
            class="whitespace-nowrap text-xs tracking-[0.1em] uppercase"
            :class="activeCollection === collection.slug && 'bg-inverted text-inverted hover:bg-inverted/90'"
            @click="handleFilterChange(collection.slug)"
          >
            {{ collection.name }}
          </UButton>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs text-muted tracking-[0.1em] uppercase">Ordenar</span>
          <USelect
            :model-value="activeSort"
            :items="sortOptions"
            value-key="value"
            class="w-[180px]"
            @update:model-value="handleSortChange"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Products Grid -->
  <section class="py-14 md:py-20">
    <div class="container-full">
      <template v-if="filteredAndSortedProducts.length > 0">
        <div class="flex items-center justify-between mb-10">
          <p class="text-sm text-muted">
            {{ filteredAndSortedProducts.length }}
            {{ filteredAndSortedProducts.length === 1 ? 'produto' : 'produtos' }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          <ProductCard
            v-for="(product, index) in filteredAndSortedProducts"
            :key="product.id"
            :product="product"
            :index="index"
          />
        </div>
      </template>

      <div v-else class="text-center py-28">
        <p class="font-serif text-2xl text-muted mb-4">
          Nenhum produto encontrado
        </p>
        <p class="text-muted mb-8">
          Esta categoria está sendo atualizada.
        </p>
        <UButton
          to="/products"
          variant="outline"
          color="neutral"
          class="px-8 text-sm tracking-[0.1em] uppercase"
        >
          Ver Todos os Produtos
        </UButton>
      </div>
    </div>
  </section>

  <!-- Bottom CTA Banner -->
  <section class="relative h-[50vh] overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80"
        alt="Perfumaria"
        loading="lazy"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-charcoal/50" />
    </div>
    <div class="relative h-full flex items-center justify-center text-center">
      <div>
        <p class="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50 mb-4">
          Precisa de Ajuda?
        </p>
        <h2 class="font-serif text-3xl md:text-5xl text-white mb-6">
          Estamos Aqui para Você
        </h2>
        <UButton
          to="mailto:contato@auparfum.com"
          external
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="px-10 text-sm tracking-[0.15em] uppercase bg-white text-charcoal hover:bg-white/90"
        >
          Fale Conosco
        </UButton>
      </div>
    </div>
  </section>
</template>
