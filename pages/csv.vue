<script setup lang="ts">
const channel = "amfr";
const { data: chatMessagesHistory } = await useChatHistory(channel);
const onDownloadCsv = () => {
  downloadCSV(chatMessagesHistory.value, "history.csv");
};
</script>

<template>
  <Stack class="p-4 md:p-6">
    <Button @click="onDownloadCsv">Download CSV</Button>
    <pre>{{ chatMessagesHistory }}</pre>
  </Stack>
</template>
