<template>
  <main class="bg-dark text-light">
    <section v-if="routeState == 'Money I/O'">
      <MoneyIO></MoneyIO>
    </section>
    <section v-if="routeState == 'Dividends'"><Dividends></Dividends></section>
    <section v-if="routeState == 'Overview'">
      <h2 class="text-center p-3">Overview</h2>
    </section>
    <footer class="row g-0 w-100">
      <div v-for="section of views" class="col-4 text-center bg-success text-light border border-sm border-dark">
        <div class="p-2" @click.stop="routeState = section">{{ section }}</div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MoneyIO from './components/MoneyIO.vue';
import Dividends from './components/Dividends.vue';

const views = ref(['Money I/O', 'Dividends', 'Overview'] as const);
const routeState = ref<typeof views.value[number]>('Money I/O');
</script>
<style lang="scss">
main {
  height: 100vh;
}
footer {
  position: absolute;
  bottom: 0;
}
</style>
