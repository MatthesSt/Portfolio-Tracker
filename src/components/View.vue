<template>
  <h2 class="text-center p-3">{{ title }}</h2>
  <slot></slot>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps<{ title: string }>();
const { title } = toRefs(props);
</script>
