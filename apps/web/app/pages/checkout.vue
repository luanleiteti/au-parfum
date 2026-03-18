<script setup lang="ts">
const router = useRouter()
const toast = useToast()
const { items, subtotal, clearCart } = useCart()

const isSubmitting = ref(false)
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Brasil',
  notes: '',
})

const shipping = computed(() => subtotal.value > 500 ? 0 : 25)
const total = computed(() => subtotal.value + shipping.value)

async function handleSubmit() {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))

  toast.add({
    title: 'Pedido Enviado',
    description: 'Obrigado! Entraremos em contato em breve para finalizar seu pedido.',
    color: 'success',
  })

  clearCart()
  isSubmitting.value = false
  router.push('/')
}

useHead({ title: 'Checkout — Au Parfum' })
</script>

<template>
  <!-- Empty Cart -->
  <div v-if="items.length === 0" class="container-narrow py-28 text-center">
    <h1 class="font-serif text-4xl mb-4">Nenhum Item para Checkout</h1>
    <p class="text-muted mb-8">Sua sacola está vazia. Adicione itens antes de finalizar.</p>
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
          { label: 'Sacola', to: '/cart' },
          { label: 'Checkout' },
        ]"
      />
    </div>

    <!-- Coming Soon Banner -->
    <UBanner
      title="Checkout online em breve. Envie seu pedido abaixo e entraremos em contato para finalizar a compra."
      icon="i-lucide-alert-circle"
      color="warning"
      :close="false"
    />

    <section class="py-10 md:py-16">
      <div class="container-full">
        <h1 class="font-serif text-4xl md:text-5xl mb-12 animate-fade-in-up">
          Checkout
        </h1>

        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <!-- Form -->
          <div class="lg:col-span-7 animate-fade-in-up" style="animation-delay: 0.1s">
            <form @submit.prevent="handleSubmit" class="space-y-8">
              <!-- Contact Information -->
              <div>
                <h2 class="font-serif text-xl mb-6">Informações de Contato</h2>
                <div class="grid sm:grid-cols-2 gap-4">
                  <UFormField label="Nome *" name="firstName">
                    <UInput v-model="formData.firstName" required placeholder="Seu nome" />
                  </UFormField>
                  <UFormField label="Sobrenome *" name="lastName">
                    <UInput v-model="formData.lastName" required placeholder="Seu sobrenome" />
                  </UFormField>
                </div>
                <div class="grid sm:grid-cols-2 gap-4 mt-4">
                  <UFormField label="Email *" name="email">
                    <UInput v-model="formData.email" type="email" required placeholder="seu@email.com" />
                  </UFormField>
                  <UFormField label="Telefone" name="phone">
                    <UInput v-model="formData.phone" type="tel" placeholder="(00) 00000-0000" />
                  </UFormField>
                </div>
              </div>

              <!-- Shipping Address -->
              <div>
                <h2 class="font-serif text-xl mb-6">Endereço de Entrega</h2>
                <div class="space-y-4">
                  <UFormField label="Endereço *" name="address">
                    <UInput v-model="formData.address" required placeholder="Rua, número, complemento" />
                  </UFormField>
                  <div class="grid sm:grid-cols-3 gap-4">
                    <UFormField label="Cidade *" name="city">
                      <UInput v-model="formData.city" required placeholder="Cidade" />
                    </UFormField>
                    <UFormField label="CEP *" name="postalCode">
                      <UInput v-model="formData.postalCode" required placeholder="00000-000" />
                    </UFormField>
                    <UFormField label="País *" name="country">
                      <UInput v-model="formData.country" required />
                    </UFormField>
                  </div>
                </div>
              </div>

              <!-- Order Notes -->
              <div>
                <h2 class="font-serif text-xl mb-6">Observações</h2>
                <UTextarea
                  v-model="formData.notes"
                  placeholder="Alguma solicitação especial ou observação sobre o pedido..."
                  :rows="4"
                />
              </div>

              <UButton
                type="submit"
                size="xl"
                trailing-icon="i-lucide-arrow-right"
                :loading="isSubmitting"
                class="w-full text-sm tracking-[0.15em] uppercase btn-premium"
              >
                {{ isSubmitting ? 'Enviando...' : 'Enviar Pedido' }}
              </UButton>
            </form>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
            <div class="bg-linen p-8 lg:sticky lg:top-28">
              <h2 class="font-serif text-2xl mb-6">Resumo do Pedido</h2>

              <div class="space-y-4 mb-6">
                <div v-for="item in items" :key="item.product.id" class="flex gap-4">
                  <div class="w-16 h-20 bg-muted overflow-hidden">
                    <img
                      :src="item.product.images[0]"
                      :alt="item.product.name"
                      class="w-full h-full object-cover"
                    >
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium line-clamp-1">{{ item.product.name }}</p>
                    <p class="text-xs text-muted mt-0.5">Qtd: {{ item.quantity }}</p>
                    <p class="text-sm mt-1">{{ formatPrice(item.product.price * item.quantity) }}</p>
                  </div>
                </div>
              </div>

              <div class="border-t border-default pt-4 space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-muted">Subtotal</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-muted">Frete</span>
                  <span>{{ shipping === 0 ? 'Grátis' : formatPrice(shipping) }}</span>
                </div>
              </div>

              <div class="border-t border-default pt-4">
                <div class="flex justify-between font-serif text-xl">
                  <span>Total</span>
                  <span>{{ formatPrice(total) }}</span>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-default">
                <p class="text-[11px] font-semibold tracking-[0.15em] uppercase text-dimmed mb-3">
                  Dúvidas?
                </p>
                <p class="text-sm text-muted">
                  Envie um email para
                  <a href="mailto:contato@auparfum.com" class="text-highlighted underline">
                    contato@auparfum.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>
