<script setup lang="ts">
import type { Product } from '~/data/products'
import { collections } from '~/data/products'

const props = defineProps<{
  product: Product
  index?: number
}>()

const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()

const inWishlist = computed(() => isInWishlist(props.product.id))
const collection = computed(() => collections.find(c => c.id === props.product.collection))
const hasSecondImage = computed(() => props.product.images.length > 1)

function toggleWishlist(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  if (inWishlist.value) {
    removeFromWishlist(props.product.id)
  } else {
    addToWishlist(props.product)
  }
}
</script>

<template>
  <article
    class="group animate-fade-in-up"
    :style="{ animationDelay: `${(index ?? 0) * 100}ms` }"
  >
    <NuxtLink :to="`/product/${product.slug}`" class="block">
      <div class="relative overflow-hidden bg-muted mb-5 aspect-[4/5]">
        <img
          :src="product.images[0]"
          :alt="product.name"
          loading="lazy"
          class="w-full h-full object-cover transition-all duration-[1s] ease-out"
          :class="hasSecondImage
            ? 'group-hover:opacity-0 group-hover:scale-105'
            : 'group-hover:scale-105'"
        >

        <img
          v-if="hasSecondImage"
          :src="product.images[1]"
          :alt="`${product.name} - vista alternativa`"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-[1s] ease-out group-hover:opacity-100 group-hover:scale-100"
        >

        <div class="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <button
          @click="toggleWishlist"
          class="absolute top-5 right-5 p-2.5 rounded-full transition-all duration-500 bg-[var(--ui-bg)]/90 backdrop-blur-md hover:bg-[var(--ui-bg)] shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          :class="inWishlist && 'opacity-100 translate-y-0'"
        >
          <UIcon
            name="i-lucide-heart"
            class="size-4 transition-all duration-300"
            :class="inWishlist ? 'text-primary fill-primary' : 'text-highlighted'"
          />
        </button>

        <div class="absolute top-5 left-5 flex flex-col gap-2">
          <span
            v-if="product.new"
            class="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-inverted text-inverted"
          >
            Novo
          </span>
          <span
            v-if="product.featured"
            class="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-primary text-inverted"
          >
            Destaque
          </span>
        </div>

        <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <span class="px-6 py-2.5 text-xs font-medium tracking-[0.15em] uppercase bg-[var(--ui-bg)]/95 backdrop-blur-md text-highlighted shadow-lg">
            Ver Detalhes
          </span>
        </div>
      </div>

      <div class="space-y-2">
        <p
          v-if="collection"
          class="text-[11px] font-medium tracking-[0.2em] uppercase text-dimmed transition-colors duration-300 group-hover:text-primary"
        >
          {{ collection.name }}
        </p>

        <h3 class="font-serif text-xl text-highlighted transition-colors duration-300 group-hover:text-primary leading-snug">
          {{ product.name }}
        </h3>

        <p class="text-sm text-muted line-clamp-1 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="flex items-center gap-3 pt-1">
          <p class="text-base font-medium text-highlighted tracking-wide">
            {{ formatPrice(product.price) }}
          </p>
          <template v-if="product.materials">
            <span class="w-px h-3 bg-[var(--ui-border)]" />
            <p class="text-xs text-dimmed tracking-wide">
              {{ product.materials.split(',')[0] }}
            </p>
          </template>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
