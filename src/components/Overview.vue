<template>
  <View title="Overview">
    <div class="p-3 grid">
      <div>Gesamte Dividende:</div>
      <div>{{ totalDividend.toFixed(2) }}€</div>
      <div>Dividende Letzen Monat:</div>
      <div>{{ lastMonthDividend.toFixed(2) }}€</div>
      <div>Sparrate:</div>
      <div>{{ totalSaving }}€/m</div>
    </div>
    <div class="px-3">Dividendenwachstum pro Monat:</div>
    <div class="p-3">
      <div class="grid" v-for="(entry,index) in (monthGrowthList as [string,number][]) ">
        <div>
          {{ new Date(+entry[0].substring(0, 4), +entry[0].substring(4) - 1, 1).toLocaleString('default', { year: '2-digit', month: 'short' }) }}:
        </div>
        <div v-if="index">{{ Math.round(+entry[1] * 10000) / 100 || 0 }}%</div>
      </div>
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
const monthGrowthList = ref<(string | number | null)[][]>([]);

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

const totalSaving = computed(() => savingList.value.reduce((a, b) => a + +b.value, 0));

function getStats() {
  stocks.value = JSON.parse(localStorage.getItem('Stocks') || '[]');
  incomeList.value = JSON.parse(localStorage.getItem('Income') || '[]');
  expenseList.value = JSON.parse(localStorage.getItem('Expense') || '[]');
  savingList.value = JSON.parse(localStorage.getItem('Saving') || '[]');
}
getStats();

function reduceDividendMonthsToGrowth(dividendArray: { [key: string]: number[] }) {
  let dividendMonths = [...Object.entries(dividendArray).map(e => [e[0], e[1].reduce((a, b) => a + +b, 0)])];
  return dividendMonths.map((e, i) => [e[0], i > 0 ? +e[1] / +dividendMonths[i - 1][1] - 1 : null]);
}
function getMonthGrowth(dividends: Stock['dividends']) {
  if (!dividends.length) [];
  let object: { [key: string]: number[] } = {};
  console.log(dividends);
  for (let dividend of dividends) {
    let dividendDate = dividend.date.split('-')[0] + dividend.date.split('-')[1];
    let current = [...(object[dividendDate] || []), +dividend.value];
    object[dividendDate] = current;
    console.log(object[dividendDate]);
  }
  return reduceDividendMonthsToGrowth(object);
}
monthGrowthList.value = getMonthGrowth(stocks.value.flatMap(e => e.dividends));
</script>
<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>
