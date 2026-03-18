<script setup lang="ts">
import { collections, products } from '~/data/products'

const latestProducts = products.slice(0, 4)
const displayedCollections = collections.slice(0, 6)
const featuredCollection = collections[0]

const instagramImages = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&q=80',
  'https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=400&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
  'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=400&q=80',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80',
]

useHead({
  title: 'Au Parfum — Perfumaria Importada & Beleza',
  meta: [
    { name: 'description', content: 'Perfumes importados, skincare premium e produtos de beleza selecionados para quem valoriza o extraordinário.' },
  ],
})
</script>

<template>
  <!-- Hero Section -->
  <section class="relative h-[100svh] -mt-[var(--ui-header-height)] overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&q=80"
        alt="Perfumaria de luxo"
        class="w-full h-full object-cover animate-ken-burns"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/50" />
    </div>

    <div class="relative container-full h-full flex flex-col justify-end pb-20 md:pb-28 pt-[var(--ui-header-height)]">
      <div class="max-w-3xl animate-fade-in-up">
        <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/70 mb-6" style="animation-delay: 0.3s">
          Perfumaria Importada & Beleza
        </p>
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-8 leading-[0.9] tracking-tight">
          A Arte da
          <br>
          <span class="italic font-normal">Fragrância</span>
        </h1>
        <p class="text-base md:text-lg text-white/80 mb-10 leading-relaxed max-w-lg">
          Perfumes importados, skincare premium e produtos de beleza
          selecionados para quem valoriza o extraordinário.
        </p>
        <UButton
          to="/products"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="btn-premium px-10 text-sm tracking-[0.15em] uppercase"
        >
          Explorar
        </UButton>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up" style="animation-delay: 1.5s">
        <span class="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        <UIcon name="i-lucide-arrow-down" class="size-4 text-white/50 animate-bounce" />
      </div>
    </div>
  </section>

  <!-- Featured Collection -->
  <section class="py-20 md:py-28">
    <div class="container-full">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div class="relative aspect-[4/5] overflow-hidden group">
          <img
            :src="featuredCollection.heroImage || featuredCollection.image"
            :alt="featuredCollection.name"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
        </div>

        <div class="md:py-12">
          <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">
            Coleção em Destaque
          </p>
          <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-highlighted mb-6 leading-[0.95]">
            {{ featuredCollection.name }}
          </h2>
          <p class="text-muted leading-relaxed mb-8 max-w-md">
            {{ featuredCollection.description }}. Descubra fragrâncias que contam histórias,
            que despertam memórias e definem personalidades únicas.
          </p>
          <UButton
            :to="`/products?collection=${featuredCollection.slug}`"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="btn-premium px-10 text-sm tracking-[0.15em] uppercase"
          >
            Ver Coleção
          </UButton>
        </div>
      </div>
    </div>
  </section>

  <!-- Latest Products -->
  <section class="py-20 md:py-28 bg-linen">
    <div class="container-full">
      <div class="flex items-end justify-between mb-14">
        <div>
          <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
            Recém Chegados
          </p>
          <h2 class="font-serif text-4xl md:text-5xl text-highlighted">
            Novidades
          </h2>
        </div>
        <NuxtLink
          to="/products"
          class="hidden md:flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-muted hover:text-highlighted transition-colors group"
        >
          Ver Todos
          <UIcon name="i-lucide-arrow-right" class="size-4 group-hover:translate-x-1 transition-transform duration-300" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        <ProductCard
          v-for="(product, index) in latestProducts"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>

      <div class="mt-14 text-center md:hidden">
        <UButton
          to="/products"
          variant="outline"
          color="neutral"
          class="px-8 py-5 text-sm tracking-[0.15em] uppercase"
        >
          Ver Todos os Produtos
        </UButton>
      </div>
    </div>
  </section>

  <!-- Collections Grid -->
  <section class="py-24 md:py-32">
    <div class="container-full">
      <div class="text-center mb-16">
        <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
          Explore Por
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-highlighted">
          Categorias
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        <div class="md:col-span-7">
          <CollectionCard :collection="displayedCollections[0]" :index="0" variant="wide" />
        </div>
        <div class="md:col-span-5">
          <CollectionCard :collection="displayedCollections[1]" :index="1" />
        </div>
        <div class="md:col-span-4">
          <CollectionCard :collection="displayedCollections[2]" :index="2" />
        </div>
        <div class="md:col-span-4">
          <CollectionCard :collection="displayedCollections[3]" :index="3" />
        </div>
        <div class="md:col-span-4">
          <CollectionCard :collection="displayedCollections[4]" :index="4" />
        </div>
        <div class="md:col-span-12">
          <CollectionCard :collection="displayedCollections[5]" :index="5" variant="wide" />
        </div>
      </div>
    </div>
  </section>

  <!-- About Us Section -->
  <section class="py-24 md:py-32 bg-linen">
    <div class="container-narrow text-center">
      <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-6">
        Sobre Nós
      </p>
      <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-highlighted leading-[1.3] mb-8">
        Acreditamos que uma fragrância é mais do que um aroma — é uma
        <span class="italic">memória</span>, uma identidade,
        uma forma de se expressar sem palavras.
      </h2>
      <p class="text-muted leading-relaxed max-w-2xl mx-auto mb-10">
        Cada produto da Au Parfum é selecionado com cuidado, desde perfumes
        importados das melhores maisons até skincare de alta performance e
        maquiagem profissional. Buscamos o extraordinário para o seu dia a dia.
      </p>
      <UButton
        to="/about"
        variant="outline"
        color="neutral"
        size="xl"
        trailing-icon="i-lucide-arrow-right"
        class="px-10 text-sm tracking-[0.15em] uppercase"
      >
        Nossa História
      </UButton>
    </div>
  </section>

  <!-- Instagram Section -->
  <section class="py-20 md:py-28">
    <div class="container-full">
      <div class="text-center mb-12">
        <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
          Siga-nos
        </p>
        <h2 class="font-serif text-3xl md:text-4xl text-highlighted mb-4">
          @auparfum
        </h2>
        <p class="text-muted max-w-md mx-auto">
          Acompanhe novidades, dicas de perfumaria e bastidores da nossa curadoria.
        </p>
      </div>

      <div class="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
        <a
          v-for="(image, index) in instagramImages"
          :key="index"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          class="relative aspect-square overflow-hidden group cursor-pointer animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <img
            :src="image"
            alt="Post do Instagram"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          >
          <div class="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
            <UIcon name="i-lucide-instagram" class="size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
