<script setup lang="ts">
//@ts-nocheck
const sample =
  "The broad narrative of Hitchhiker follows the misadventures of the last surviving man, Arthur Dent, following the demolition of the Earth by a Vogon constructor fleet to make way for a hyperspace bypass. Dent is rescued from Earth's destruction by Ford Prefect—a human-like alien writer for the eccentric, electronic travel guide The Hitchhiker's Guide to the Galaxy—by hitchhiking onto a passing Vogon spacecraft. Following his rescue, Dent explores the galaxy with Prefect and encounters Trillian, another human who had been taken from Earth (before its destruction) by the two-headed President of the Galaxy Zaphod Beeblebrox and the depressed Marvin, the Paranoid Android. Certain narrative details were changed among the various adaptations.";

const scrollable = ref<HTMLElement | null>(null);
const textarea = ref<HTMLTextAreaElement | HTMLInputElement | null>(null);

const channel = "amfr";

const {
  chatMessages,
  newChatMessage,
  sendChatMessage,
  newChatMessagesCount,
  scrollToBottom,
  focus,
} = useChat(channel, scrollable, textarea);

const { data: chatMessagesHistory } = await useChatHistory(channel);

const scrollToTop = () =>
  scrollable.value ? (scrollable.value.scrollTop = 0) : {};

const messages = computed(() => [
  ...chatMessagesHistory.value,
  ...chatMessages.value,
]);

onMounted(() => {
  scrollToBottom();
});

const send = () => {
  scrollToBottom();
  sendChatMessage();
};
</script>

<template>
  <Stack class="p-4 md:p-6">
    <div
      ref="scrollable"
      class="flex flex-col gap-6 overflow-y-auto max-h-[600px]"
      :class="[newChatMessagesCount ? 'scroll-smooth' : '']"
    >
      <Card v-for="message in messages.slice(-100)">
        <div class="text-sm text-black/50 mb-1">{{ message.username }}</div>
        <div class="break-all">{{ message.value }}</div>
      </Card>
    </div>
    <Stack class="justify-end">
      <textarea
        class="max-h-64 rounded-xl text-black px-3 py-2 focus:shadow-2xl focus:ring-0 border-orange-400 border-4 outline-none"
        ref="textarea"
        v-model="newChatMessage"
      />
      <p class="text-xs tracking-wide text-black/30">
        Shift + Enter for newline, Enter to submit
      </p>
      <div class="flex gap-4">
        <!-- <Button class="outline-hidden" @click="paste"> Paste text </Button>
        <Button class="outline-hidden" @click="scrollToTop">
          Scroll to top
        </Button> -->
        <Button primary @click="send">Send message</Button>
      </div>
    </Stack>
    <!-- <Button small class="mt-4 flex" @click="scrollToBottom">
      New messages
    </Button> -->
  </Stack>
</template>
