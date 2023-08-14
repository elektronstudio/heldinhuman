<script setup lang="ts">
const domain = "https://heldinhuman.elektron.art";
</script>

<template>
  <Stack class="p-4 md:p-6">
    <Body class="bg-orange-300" />
    <h1 class="text-4xl font-bold uppercase">Held In Human backend</h1>
    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink to="/chat">
        <Card class="bg-orange-200 hover:bg-orange-200/80">
          <Stack>
            <h1 class="font-bold text-xl break-all">{{ domain }}/chat</h1>
            <p>Embeddable chat widget</p>
          </Stack>
        </Card>
      </NuxtLink>
      <NuxtLink to="/chat">
        <Card class="bg-orange-200 hover:bg-orange-200/80">
          <Stack>
            <h1 class="font-bold text-xl break-all">{{ domain }}/q</h1>
            <p>Embeddable widget for showing last chat message</p>
          </Stack>
        </Card>
      </NuxtLink>
      <NuxtLink to="/history">
        <Card class="bg-orange-200 hover:bg-orange-200/80">
          <Stack>
            <h1 class="font-bold text-xl">/history</h1>
            <p>Embeddable widget for showing last chat message</p>
          </Stack>
        </Card>
      </NuxtLink>
    </div>
  </Stack>
</template>
