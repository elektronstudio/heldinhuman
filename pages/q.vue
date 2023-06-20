<script setup lang="ts">
//@ts-nocheck

const scrollable = ref<HTMLElement | null>(null);
const textarea = ref<HTMLTextAreaElement | HTMLInputElement | null>(null);

const channel = "amfr";

const { chatMessages } = useChat(channel, scrollable, textarea);

const message = computed(
  () =>
    chatMessages.value
      .filter((m) => m.value.startsWith("/q"))
      .map((m) => {
        m.value = m.value.replace("/q", "").trim();
        return m;
      })
      .slice(-1)[0]
);
</script>

<template>
  <Stack class="p-4 md:p-6">
    <div class="text-5xl font-bold text-center">
      {{ message?.value }}
    </div>
  </Stack>
</template>
