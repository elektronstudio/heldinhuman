import ReconnectingWebSocket from "reconnecting-websocket";
export const useMessages = () => {
  const messages = ref([]);
  const sendMessage = ref((_: any) => {});
  const ws = ref(null);

  onMounted(() => {
    const websocket = new ReconnectingWebSocket("wss://data.elektron.art");
    websocket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      messages.value.push(message as never);
    });
    sendMessage.value = (message: any) =>
      websocket.send(
        JSON.stringify({
          id: randomString(),
          datetime: new Date().toISOString(),
          ...message,
        })
      );
  });
  return { messages, sendMessage, ws };
};
