<template>
  <h2 class="text-center p-3">{{ title }}</h2>
  <slot></slot>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();
</script>
