<template>
  <main class="bg-dark text-light">
    <section v-if="routeState == 'I/O'">
      <MoneyIO/>
    </section>
    <section v-if="routeState == 'Dividends'"><Dividends/></section>
    <section v-if="routeState == 'Overview'"><Overview/></section>
    <section v-if="routeState == 'Import/Export'"><ImportExport/></section>
  </main>
  <footer class="row g-0 w-100">
    <div v-for="section of views" class="col text-center bg-success text-light border border-sm border-dark">
      <div class="p-2" @click.stop="routeState = section">{{ section }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import MoneyIO from './views/MoneyIO.vue';
import Dividends from './views/Dividends.vue';
import Overview from './views/Overview.vue';
import ImportExport from './views/ImportExport.vue';

import { views, routeState } from './state';
</script>
<style lang="scss">
main {
  height: calc(100vh - 40px);
  overflow: auto;
}
footer {
  position: absolute;
  bottom: 0;
  height: 40px;
}
</style>
