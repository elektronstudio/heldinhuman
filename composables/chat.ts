interface UseChatOptions {
  userId?: Ref<string>;
  userName?: Ref<string>;
  sentMessageType?: string;
  receiveMessageType?: string;
}

export function useChat(
  channel: string,
  scrollable: Ref<HTMLElement>,
  textarea: Ref<HTMLInputElement | HTMLTextAreaElement>,
  options: UseChatOptions = {}
) {
  const {
    userId = useUserId(),
    userName = useUserName(),
    sentMessageType = "CHAT",
    receiveMessageType = "CHAT",
  } = options;
  const { messages, sendMessage } = useMessages();
  const scrollData = useScroll(scrollable);
  const { focused: focus } = useFocus(textarea, { initialValue: true });
  const newChatMessagesCount = ref(0);

  const chatMessages = computed(() => {
    return messages.value.filter(
      (m) => m.type === receiveMessageType && m.channel === channel
    );
  });

  const newChatMessage = ref("");

  const sendChatMessage = () => {
    if (newChatMessage.value.trim()) {
      sendMessage.value({
        channel: channel,
        userid: userId.value,
        username: userName.value,
        type: sentMessageType,
        value: newChatMessage.value,
        store: true,
      });
      newChatMessage.value = "";
      focus.value = true;
    }
  };

  const scrollToBottom = async () =>
    await nextTick(
      () => (scrollable.value.scrollTop = scrollable.value.scrollHeight)
    );

  // When user is scrolled away from the bottom
  // by SCROLL_AWAY_OFFSET

  const SCROLL_AWAY_OFFSET = 200;

  const scrolledAway = computed(() => {
    return (
      scrollable.value?.scrollHeight -
        scrollable.value?.clientHeight -
        scrollData.y.value >
      SCROLL_AWAY_OFFSET
    );
  });

  watch(chatMessages, async () => {
    if (scrolledAway.value === false) {
      // When user is in botton, scroll to the
      // bottom of the new message
      scrollToBottom();
    } else {
      // Wheb user has scrolled up from bottom,
      // do not scroll down
      // and add to new message count instead
      newChatMessagesCount.value++;
    }
  });

  // When user scrolls back to bottom,
  // clear the new messages

  watch(scrolledAway, () => {
    if (scrolledAway.value === false) {
      newChatMessagesCount.value = 0;
    }
  });

  // Newline on Shift + Enter, submit on Enter

  const shift = useKeyModifier("Shift");

  onKeyStroke(
    "Enter",
    (e) => {
      if (!shift.value) {
        e.preventDefault();
        sendChatMessage();
      }
    },
    { target: textarea }
  );

  return {
    chatMessages,
    newChatMessage,
    sendChatMessage,
    newChatMessagesCount,
    scrollToBottom,
    focus,
  };
}
