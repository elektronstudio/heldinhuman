<script setup lang="ts">
import { computed } from "vue";

type Props = {
  modelValue?: string;
};

type Emits = {
  (e: "update:modelValue", value: string): void;
};

const { modelValue = "" } = defineProps<Props>();

const emit = defineEmits<Emits>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const classes = [
  "max-h-64 md:whitespace-pre-wrap border-gray-500 bg-black/0 px-2 py-1 font-mono text-white focus:border-green-400 focus:ring-0",
];
</script>

<template>
  <div class="relative w-full">
    <div class="invisible" :class="classes">
      {{ inputValue + " " }}
    </div>
    <textarea
      class="absolute inset-0 resize-none"
      :class="classes"
      v-bind="$attrs"
      v-model="inputValue"
    />
  </div>
</template>
