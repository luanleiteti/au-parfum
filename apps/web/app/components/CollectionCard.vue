<script setup lang="ts">
import type { Collection } from '~/data/products'

defineProps<{
  collection: Collection
  index?: number
  variant?: 'default' | 'wide' | 'tall'
}>()
</script>

<template>
  <article
    class="animate-fade-in-up"
    :style="{ animationDelay: `${(index ?? 0) * 120}ms` }"
  >
    <NuxtLink
      :to="`/products?collection=${collection.slug}`"
      class="group block relative"
    >
      <div
        class="relative overflow-hidden bg-muted"
        :class="{
          'aspect-[16/9]': variant === 'wide',
          'aspect-[2/3]': variant === 'tall',
          'aspect-[3/4]': !variant || variant === 'default',
        }"
      >
        <img
          :src="collection.image"
          :alt="collection.name"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        >

        <div class="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
        <div class="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-700" />

        <div class="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
          <p class="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            Coleção
          </p>

          <h3 class="font-serif text-2xl md:text-3xl text-white mb-2 group-hover:-translate-y-1 transition-transform duration-500">
            {{ collection.name }}
          </h3>

          <p class="text-sm text-white/70 leading-relaxed max-w-xs translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
            {{ collection.description }}
          </p>

          <div class="flex items-center gap-2 mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
            <span class="text-xs font-medium tracking-[0.15em] uppercase text-white/90">
              Explorar
            </span>
            <UIcon name="i-lucide-arrow-right" class="size-4 text-white/90 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        <div class="absolute top-0 left-0 right-0 h-[2px] bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
      </div>
    </NuxtLink>
  </article>
</template>
