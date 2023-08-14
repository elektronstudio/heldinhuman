<script setup lang="ts">
//@ts-nocheck

const scrollable = ref<HTMLElement | null>(null);
const textarea = ref<HTMLTextAreaElement | HTMLInputElement | null>(null);

const channel = "amfr";

const { chatMessages } = useChat(channel, scrollable, textarea);

const message = ref("");

watch(chatMessages, () => {
  const lastMessage = chatMessages.value.slice(-1)[0];
  if (lastMessage.value.startsWith("/q")) {
    message.value = lastMessage.value.replace("/q", "").trim();
  }
});
</script>

<template>
  <Stack class="p-4 md:p-6">
    <div class="text-5xl font-bold text-center">
      {{ message }}
    </div>
  </Stack>
</template>
