<script setup lang="ts">
import { timeFormat, flatGroup } from "d3";
const channel = "amfr";
const { data: chatMessagesHistory } = await useChatHistory(channel);
const processedHistory = computed(() => {
  if (!chatMessagesHistory.value) return [];
  const history = chatMessagesHistory.value.map((h) => {
    return {
      ...h,
      formattedDate: timeFormat("%d %B %Y")(new Date(h.datetime)),
    };
  });
  return flatGroup(history, (d: any) => d.formattedDate);
});
const onDownloadAllCsv = () => {
  downloadCSV(chatMessagesHistory.value, "all chat history.csv");
};
const onDownloadDayCsv = (key: string) => {
  const dayCsv = processedHistory.value.filter((k: any) => k[0] === key)[0][1];
  downloadCSV(dayCsv, `${key} chat history.csv`);
};
</script>

<template>
  <Stack class="p-4 md:p-6">
    <NuxtLink to="/"><LeftArrow /></NuxtLink>
    <h1 class="text-4xl font-bold uppercase flex items-center gap-4">
      CHAT HISTORY
    </h1>
    <Button @click="onDownloadAllCsv">Download all history CSV</Button>
    <div>Or download history per day:</div>
    <div v-for="key in processedHistory.map((d: any) => d[0]).reverse()">
      <Button @click="onDownloadDayCsv(key)">Download {{ key }} CSV</Button>
    </div>
    <!-- <pre class="break-all">
      {{ processedHistory }}
    </pre> -->
  </Stack>
</template>
