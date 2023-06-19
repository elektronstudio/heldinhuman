<script setup lang="ts">
// import IconArrowUp from "~icons/radix-icons/arrow-up";
// import IconArrowRight from "~icons/radix-icons/arrow-right";
// import IconArrowDown from "~icons/radix-icons/arrow-down";
// import IconArrowLeft from "~icons/radix-icons/arrow-left";

type Props = {
  to?: string;
  href?: string;
  small?: boolean;
  primary?: boolean;
  up?: boolean;
  right?: boolean;
  down?: boolean;
  left?: boolean;
};
const {
  to = undefined,
  href = undefined,
  small = false,
  primary = false,
  up = false,
  right = false,
  down = false,
  left = false,
} = defineProps<Props>();

const classes = {
  small:
    "self-start	inline-flex flex gap-1 font-mono text-xs uppercase text-gray-300 transition-colors hover:text-gray-500 tracking-wide",
  regular:
    "self-start	flex h-7 items-center gap-1 rounded border border-gray-50 bg-black/90 px-2 font-mono text-sm uppercase text-gray-300 transition-colors hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-20",
  primary:
    "self-start	border-green-400 bg-green-400 !text-[black] hover:border-green-500 hover:bg-green-500",
};
</script>

<template>
  <NuxtLink
    v-if="to && !href"
    :to="to"
    :class="[
      small ? classes.small : '',
      !small ? classes.regular : '',
      primary ? classes.primary : '',
    ]"
  >
    <!-- <IconArrowLeft v-if="left" /> -->
    <!-- <IconArrowDown v-if="down" /> -->
    <!-- <IconArrowUp v-if="up" /> -->
    <div class="translate-y-[0.05rem]">
      <slot />
    </div>
    <!-- <IconArrowRight v-if="right" /> -->
  </NuxtLink>
  <a
    v-else-if="!to && href"
    :href="href"
    target="_blank"
    :class="[
      small ? classes.small : '',
      !small ? classes.regular : '',
      primary ? classes.primary : '',
    ]"
  >
    <!-- <IconArrowLeft v-if="left" /> -->
    <!-- <IconArrowDown v-if="down" /> -->
    <!-- <IconArrowUp v-if="up" /> -->
    <div class="flex translate-y-[0.05rem] items-center gap-2"><slot /></div>
    <!-- <IconArrowRight v-if="right" /> -->
  </a>
  <button
    v-else
    :to="to"
    :class="[
      small ? classes.small : '',
      !small ? classes.regular : '',
      primary ? classes.primary : '',
    ]"
  >
    <!-- <IconArrowLeft v-if="left" /> -->
    <!-- <IconArrowDown v-if="down" /> -->
    <!-- <IconArrowUp v-if="up" /> -->
    <div class="flex translate-y-[0.05rem] items-center gap-2"><slot /></div>
    <!-- <IconArrowRight v-if="right" /> -->
  </button>
</template>
