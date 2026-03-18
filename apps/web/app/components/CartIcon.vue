<script setup lang="ts">
const { itemCount } = useCart()
</script>

<template>
  <NuxtLink
    to="/cart"
    class="relative p-2 hover:bg-accented transition-colors duration-300 group"
  >
    <UIcon
      name="i-lucide-shopping-bag"
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
        v-if="itemCount > 0"
        class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-inverted text-[10px] font-semibold rounded-full flex items-center justify-center"
      >
        {{ itemCount > 9 ? '9+' : itemCount }}
      </span>
    </Transition>
  </NuxtLink>
</template>
