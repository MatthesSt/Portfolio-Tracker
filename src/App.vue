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
import { ref, watch } from 'vue';
import MoneyIO from './components/MoneyIO.vue';
import Dividends from './components/Dividends.vue';

const views = ref(['Money I/O', 'Dividends', 'Overview'] as const);
const routeState = ref<typeof views.value[number]>('Money I/O');

function getLastRoute() {
  let lastRoute = localStorage.getItem('lastRoute');
  if (!lastRoute) return views.value[0];
  let route = lastRoute?.split(',')[0] as typeof views.value[number];
  let day = lastRoute?.split(',')[1];
  let time = lastRoute?.split(',')[2];
  let currentday = new Date().toLocaleDateString();
  if (day == currentday) {
    let currentTime = new Date().toLocaleTimeString();
    let hour = time.split(':')[0];
    if (hour == currentTime.split(':')[0] || (+hour == +currentTime.split(':')[0] - 1 && +time.split(':')[1] > +currentTime)) {
      routeState.value = route as typeof views.value[number];
    }
  }
  console.log(lastRoute);
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
