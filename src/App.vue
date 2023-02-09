<template>
  <main class="bg-dark text-light">
    <section v-if="routeState == 'I/O'">
      <MoneyIO></MoneyIO>
    </section>
    <section v-if="routeState == 'Dividends'"><Dividends></Dividends></section>
    <section v-if="routeState == 'Overview'"><Overview></Overview></section>
    <section v-if="routeState == 'Saving'"><Saving></Saving></section>

    <footer class="row g-0 w-100">
      <div v-for="section of views" class="col text-center bg-success text-light border border-sm border-dark">
        <div class="p-2" @click.stop="routeState = section">{{ section }}</div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import MoneyIO from './components/MoneyIO.vue';
import Dividends from './components/Dividends.vue';
import Overview from './components/Overview.vue';
import Saving from './components/Saving.vue';

import { views, routeState } from './state';
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
