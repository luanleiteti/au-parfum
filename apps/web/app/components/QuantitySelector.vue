<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
}>(), {
  min: 1,
  max: 10,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function decrease() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function increase() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div class="flex items-center border border-[var(--ui-border)]">
    <UButton
      icon="i-lucide-minus"
      variant="ghost"
      color="neutral"
      size="md"
      class="rounded-none"
      :disabled="modelValue <= min"
      @click="decrease"
    />
    <span class="w-12 text-center text-sm font-medium tabular-nums">
      {{ modelValue }}
    </span>
    <UButton
      icon="i-lucide-plus"
      variant="ghost"
      color="neutral"
      size="md"
      class="rounded-none"
      :disabled="modelValue >= max"
      @click="increase"
    />
  </div>
</template>
