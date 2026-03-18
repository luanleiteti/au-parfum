<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { collections } from '~/data/products'

import UserMenu from './UserMenu.vue'

const route = useRoute()
const { items: wishlistItems } = useWishlist()

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Categorias',
    children: collections.map(c => ({
      label: c.name,
      description: c.description,
      to: `/products?collection=${c.slug}`,
    })),
  },
  {
    label: 'Todos os Produtos',
    to: '/products',
    active: route.path === '/products',
  },
  {
    label: 'Sobre',
    to: '/about',
    active: route.path === '/about',
  },
])

const mobileNavItems = computed<NavigationMenuItem[]>(() => [
  ...collections.map(c => ({
    label: c.name,
    to: `/products?collection=${c.slug}`,
  })),
  { type: 'separator' as const },
  { label: 'Todos os Produtos', to: '/products' },
  { label: 'Sobre', to: '/about' },
  { label: 'Sacola', to: '/cart' },
])
</script>

<template>
  <UHeader>
    <template #title>
      <NuxtLink
        to="/"
        class="font-serif text-2xl md:text-3xl tracking-tight text-highlighted hover:text-primary transition-colors duration-300"
      >
        Au Parfum
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="navItems"
      variant="link"
      color="neutral"
      :ui="{
        link: 'text-xs font-medium tracking-[0.15em] uppercase text-muted hover:text-highlighted',
        linkLabel: 'whitespace-nowrap',
        viewport: '!w-[600px]',
        childList: 'grid-cols-2 gap-1 p-4',
        childLink: 'p-3 gap-2 rounded-sm',
        childLinkLabel: 'whitespace-normal font-medium text-sm',
        childLinkDescription: 'whitespace-normal text-sm leading-snug',
      }"
    />

    <template #right>
      <UTooltip :text="wishlistItems.length === 0 ? 'Lista de desejos vazia' : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item salvo' : 'itens salvos'}`">
        <NuxtLink to="/products" class="relative p-2 hover:bg-accented transition-colors duration-300 group">
          <UIcon
            name="i-lucide-heart"
            class="size-5 transition-transform duration-300 group-hover:scale-110"
          />
          <Transition
            enter-active-class="transition-transform duration-200"
            enter-from-class="scale-0"
            enter-to-class="scale-100"
            leave-active-class="transition-transform duration-200"
            leave-from-class="scale-100"
            leave-to-class="scale-0"
          >
            <span
              v-if="wishlistItems.length > 0"
              class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-inverted text-[10px] font-semibold rounded-full flex items-center justify-center"
            >
              {{ wishlistItems.length > 9 ? '9+' : wishlistItems.length }}
            </span>
          </Transition>
        </NuxtLink>
      </UTooltip>

      <CartIcon />
      <UColorModeButton />
      <UserMenu />
    </template>

    <template #body>
      <UNavigationMenu :items="mobileNavItems" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
