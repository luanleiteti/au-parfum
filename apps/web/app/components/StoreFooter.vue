<script setup lang="ts">
import { collections } from '~/data/products'
</script>

<template>
  <footer class="bg-inverted text-inverted">
    <div class="border-b border-white/10">
      <div class="container-full py-12 md:py-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <NuxtLink to="/" class="font-serif text-3xl md:text-4xl tracking-tight">
              Au Parfum
            </NuxtLink>
            <p class="mt-3 text-sm text-white/50 leading-relaxed max-w-xs">
              Perfumes importados, skincare premium e beleza para quem aprecia o extraordinário.
            </p>
          </div>

          <div class="max-w-sm w-full">
            <p class="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/40 mb-3">
              Fique por Dentro
            </p>
            <form class="flex gap-0" @submit.prevent>
              <input
                type="email"
                placeholder="Seu email"
                class="flex-1 h-12 px-4 text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
              >
              <button
                type="submit"
                class="h-12 px-5 text-sm font-medium bg-white text-charcoal hover:bg-white/90 transition-colors"
              >
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="container-full py-12 md:py-16">
      <div class="grid gap-10 md:grid-cols-4">
        <div>
          <h4 class="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">
            Categorias
          </h4>
          <ul class="space-y-3">
            <li v-for="collection in collections" :key="collection.id">
              <NuxtLink
                :to="`/products?collection=${collection.slug}`"
                class="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {{ collection.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">
            Explorar
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/products" class="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Todos os Produtos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Nossa História
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart" class="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Sacola
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">
            Suporte
          </h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Envio & Devoluções
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Guia de Fragrâncias
              </a>
            </li>
            <li>
              <a href="#" class="text-sm text-white/60 hover:text-white transition-colors duration-300">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">
            Contato
          </h4>
          <ul class="space-y-3">
            <li>
              <a
                href="mailto:contato@auparfum.com"
                class="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                contato@auparfum.com
              </a>
            </li>
            <li>
              <p class="text-sm text-white/40 leading-relaxed">
                Seg–Sex, 9h–18h
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="container-full py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-white/30">
          © {{ new Date().getFullYear() }} Au Parfum. Todos os direitos reservados.
        </p>
        <div class="flex gap-8">
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors duration-300">
            Política de Privacidade
          </a>
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors duration-300">
            Termos de Uso
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
