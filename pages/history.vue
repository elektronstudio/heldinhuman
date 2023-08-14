<script setup lang="ts">
const channel = "amfr";
const { data: chatMessagesHistory } = await useChatHistory(channel);
const onDownloadCsv = () => {
  downloadCSV(chatMessagesHistory.value, "history.csv");
};
</script>

<template>
  <Stack class="p-4 md:p-6 bg-orange-300 h-screen">
    <Body class="bg-orange-300" />
    <NuxtLink to="/"><LeftArrow /></NuxtLink>
    <h1 class="text-4xl font-bold uppercase flex items-center gap-4">
      CHAT HISTORY
    </h1>
    <Button @click="onDownloadCsv">Download CSV</Button>
    <!-- <div class="font-sans w-96 border-4 break-all">
      {{ chatMessagesHistory }}
    </div> -->
  </Stack>
</template>
