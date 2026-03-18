<script setup lang="ts">
const { items, updateQuantity, removeItem, subtotal } = useCart()

const shipping = computed(() => subtotal.value > 500 ? 0 : 25)
const total = computed(() => subtotal.value + shipping.value)

useHead({ title: 'Sacola — Au Parfum' })
</script>

<template>
  <!-- Empty Cart -->
  <div v-if="items.length === 0" class="container-narrow py-28 text-center">
    <UIcon name="i-lucide-shopping-bag" class="size-16 mx-auto mb-6 text-dimmed" />
    <h1 class="font-serif text-4xl mb-4">Sua Sacola está Vazia</h1>
    <p class="text-muted mb-8 max-w-md mx-auto">
      Descubra nossa coleção curada de perfumes importados e encontre
      fragrâncias que falam com você.
    </p>
    <UButton
      to="/products"
      size="xl"
      trailing-icon="i-lucide-arrow-right"
      class="btn-premium px-10 text-sm tracking-[0.15em] uppercase"
    >
      Começar a Comprar
    </UButton>
  </div>

  <template v-else>
    <!-- Breadcrumb -->
    <div class="container-full py-6 border-b border-default">
      <UBreadcrumb
        :items="[
          { label: 'Loja', to: '/products' },
          { label: 'Sacola' },
        ]"
      />
    </div>

    <section class="py-10 md:py-16">
      <div class="container-full">
        <h1 class="font-serif text-4xl md:text-5xl mb-12 animate-fade-in-up">
          Sua Sacola
        </h1>

        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <!-- Cart Items -->
          <div class="lg:col-span-7">
            <div class="space-y-0">
              <div
                v-for="(item, index) in items"
                :key="item.product.id"
                class="flex gap-6 py-8 border-b border-default animate-fade-in-up"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <NuxtLink
                  :to="`/product/${item.product.slug}`"
                  class="w-28 h-32 md:w-36 md:h-44 shrink-0 overflow-hidden bg-muted group"
                >
                  <img
                    :src="item.product.images[0]"
                    :alt="item.product.name"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                </NuxtLink>

                <div class="flex-1 flex flex-col">
                  <div class="flex-1">
                    <NuxtLink
                      :to="`/product/${item.product.slug}`"
                      class="font-serif text-lg md:text-xl hover:text-primary transition-colors"
                    >
                      {{ item.product.name }}
                    </NuxtLink>
                    <p class="text-sm text-muted mt-1 line-clamp-2">
                      {{ item.product.description }}
                    </p>
                    <p class="font-serif text-lg mt-3">
                      {{ formatPrice(item.product.price) }}
                    </p>
                  </div>

                  <div class="flex items-center justify-between mt-4">
                    <QuantitySelector
                      :model-value="item.quantity"
                      @update:model-value="(qty: number) => updateQuantity(item.product.id, qty)"
                    />
                    <UButton
                      icon="i-lucide-trash-2"
                      variant="ghost"
                      color="error"
                      @click="removeItem(item.product.id)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <NuxtLink
              to="/products"
              class="inline-flex items-center gap-2 mt-8 text-sm tracking-[0.1em] uppercase text-muted hover:text-highlighted transition-colors"
            >
              <UIcon name="i-lucide-arrow-left" class="size-4" />
              Continuar Comprando
            </NuxtLink>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
            <div class="bg-linen p-8 lg:sticky lg:top-28">
              <h2 class="font-serif text-2xl mb-8">Resumo do Pedido</h2>

              <div class="space-y-4 mb-8">
                <div class="flex justify-between text-sm">
                  <span class="text-muted">Subtotal</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-muted">Frete</span>
                  <span>{{ shipping === 0 ? 'Grátis' : formatPrice(shipping) }}</span>
                </div>
                <p v-if="subtotal < 500" class="text-xs text-muted">
                  Frete grátis em pedidos acima de R$ 500
                </p>
              </div>

              <div class="border-t border-default pt-4 mb-8">
                <div class="flex justify-between font-serif text-xl">
                  <span>Total</span>
                  <span>{{ formatPrice(total) }}</span>
                </div>
              </div>

              <UButton
                to="/checkout"
                size="xl"
                trailing-icon="i-lucide-arrow-right"
                class="w-full text-sm tracking-[0.15em] uppercase btn-premium"
              >
                Finalizar Pedido
              </UButton>

              <div class="mt-8 pt-6 border-t border-default grid grid-cols-2 gap-4">
                <div>
                  <p class="text-[11px] font-semibold tracking-[0.15em] uppercase text-dimmed mb-1">Envio</p>
                  <p class="text-xs text-muted">Entrega em todo Brasil</p>
                </div>
                <div>
                  <p class="text-[11px] font-semibold tracking-[0.15em] uppercase text-dimmed mb-1">Devoluções</p>
                  <p class="text-xs text-muted">Política de 14 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>
