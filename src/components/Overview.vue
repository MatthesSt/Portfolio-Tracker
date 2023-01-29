<template>
  <View title="Overview">
    <div class="p-3 grid">
      <div>Gesamte Dividende:</div>
      <div>{{ totalDividend }}€</div>
      <div>Sparrate:</div>
      <div>{{ totalSaving }}€/m</div>
    </div>
  </View>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import View from './View.vue';

interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
}
type LSItem = { title: string; value: string };

const stocks = ref<Stock[]>([]);
const incomeList = ref<LSItem[]>([]);
const expenseList = ref<LSItem[]>([]);
const savingList = ref<{ title: string; value: string; rate: string; id: string }[]>([]);

const totalDividend = computed(() => stocks.value.flatMap(e => e.dividends).reduce((a, b) => a + +b.value, 0));
const totalSaving = computed(() => savingList.value.reduce((a, b) => a + +b.value, 0));

function getStats() {
  stocks.value = JSON.parse(localStorage.getItem('Stocks') || '');
  incomeList.value = JSON.parse(localStorage.getItem('Income') || '');
  expenseList.value = JSON.parse(localStorage.getItem('Expense') || '');
  savingList.value = JSON.parse(localStorage.getItem('Saving') || '');
}
getStats();
</script>
<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
