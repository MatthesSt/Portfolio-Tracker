<template>
  <View title="Overview">
    <div class="p-3 grid">
      <div>Gesamte Dividende:</div>
      <div>{{ totalDividend }}€</div>
      <div>Dividende Letzen Monat:</div>
      <div>{{ lastMonthDividend }}€</div>
      <!-- <div>Dividendenwachstum pro Monat:</div>
      <div>{{ AvgMonthGrowth }}€</div> -->
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
const lastMonthDividend = computed(() =>
  stocks.value
    .flatMap(e => e.dividends)
    .filter(e => +e.date.split('-')[1] == new Date().getMonth())
    .reduce((a, b) => a + +b.value, 0)
);
const AvgMonthGrowth = computed(() =>
  stocks.value
    .flatMap(e => e.dividends)
    .filter(e => +e.date.split('-')[1] == (new Date().getMonth() - 1 + 12) % 12)
    .reduce((a, b) => a + +b.value, 0)
);

// function getAvgGrowth(dividends: Stock['dividends']) {
//   // let dateSorted = dividends.sort((a, b) => (a.date > b.date ? 1 : -1));
//   console.log(dividends);
// }
// getAvgGrowth(stocks.value.flatMap(e => e.dividends));
//dividend[] to avg growth per month
//sum of each month
//reduce to (sum of (sum/sum of last month) )/ months
const totalSaving = computed(() => savingList.value.reduce((a, b) => a + +b.value, 0));

function getStats() {
  stocks.value = JSON.parse(localStorage.getItem('Stocks') || '[]');
  incomeList.value = JSON.parse(localStorage.getItem('Income') || '[]');
  expenseList.value = JSON.parse(localStorage.getItem('Expense') || '[]');
  savingList.value = JSON.parse(localStorage.getItem('Saving') || '[]');
}
getStats();
</script>
<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>
