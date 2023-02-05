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
import { ref, watch } from 'vue';
import MoneyIO from './components/MoneyIO.vue';
import Dividends from './components/Dividends.vue';
import Overview from './components/Overview.vue';
import Saving from './components/Saving.vue';

const views = ref(['I/O', 'Dividends', 'Saving', 'Overview'] as const);
const routeState = ref<typeof views.value[number]>('I/O');

function getLastRoute() {
  let lastRoute = localStorage.getItem('lastRoute');
  if (!lastRoute) return views.value[0];
  let [route, day, time] = lastRoute?.split(',');
  if (day == new Date().toLocaleDateString()) {
    let [currentHour, currentMinute] = new Date().toLocaleTimeString();
    let hour = time.split(':')[0];
    if (hour == currentHour || (+hour == +currentHour - 1 && +currentMinute > +currentMinute)) {
      routeState.value = route.slice(1) as typeof views.value[number];
    }
  }
}
getLastRoute();

watch(
  () => routeState.value,
  (newValue, oldValue) => {
    localStorage.setItem('lastRoute', JSON.stringify(`${newValue},${new Date().toLocaleDateString()},${new Date().toLocaleTimeString()}`));
  },
  { deep: true }
);
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
