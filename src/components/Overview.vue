<template>
  <View title="Overview">
    <div class="p-3 grid">
      <div>Zuletzt Aktualisiert:</div>
      <div>{{ lastUpdated }}</div>
      <div>Gesamte Dividende:</div>
      <div>{{ totalDividend.toFixed(2) }}€</div>
      <div>Dividende Letzen Monat:</div>
      <div>{{ lastMonthDividend.toFixed(2) }}€</div>
      <div>Sparrate:</div>
      <div>{{ totalSaving }}€/m</div>
    </div>
    <div class="px-3">Dividendenwachstum pro Monat:</div>
    <div class="px-3 py-2 overflow-auto" style="max-height: 60vh">
      <div class="monthlyDivGrid pb-2">
        <div>Monat</div>
        <div>Dividende</div>
        <div>Wachstum</div>
      </div>
      <div class="monthlyDivGrid" v-for="(entry,index) in (monthGrowthList as [string,number][]) ">
        <div style="border-bottom: 1px solid white" v-if="index && !((+entry[0].substring(4) - 1) % 3)">
          Q{{ Math.floor((+entry[0].substring(4) - 1) / 3) || 4 }}
        </div>
        <div style="border-bottom: 1px solid white" v-if="index && !((+entry[0].substring(4) - 1) % 3)">
          {{ getHalfYearDividendBracket(index).toFixed(2) }}
        </div>
        <div style="border-bottom: 1px solid white" v-if="index && !((+entry[0].substring(4) - 1) % 3)">
          {{
            (
              Math.round(
                (getHalfYearDividendBracket(index) / (getHalfYearDividendBracket(index - 3) || getHalfYearDividendBracket(index)) - 1) * 10000
              ) / 100
            ).toFixed(2)
          }}%
        </div>
        <div>
          {{ new Date(+entry[0].substring(0, 4), +entry[0].substring(4) - 1, 1).toLocaleString('default', { year: '2-digit', month: 'short' }) }}:
        </div>
        <div>{{ monthDividendList[index][1].reduce((a, b) => a + b, 0).toFixed(2) }}</div>
        <div v-if="index">{{ Math.round(+entry[1] * 10000) / 100 || 0 }}%</div>
      </div>
    </div>
  </View>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import View from './View.vue';
import { savingList, stockList } from '../state';

interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
}

const monthGrowthList = ref<(string | number | null)[][]>([]);
const lastUpdated = ref('');

const monthDividendList = computed(() => Object.entries(getMonthObject(stockList.value.flatMap(e => e.dividends))));
const totalSaving = computed(() => savingList.value.reduce((a, b) => a + +b.value, 0));
const totalDividend = computed(() => stockList.value.flatMap(e => e.dividends).reduce((a, b) => a + +b.value, 0));
const lastMonthDividend = computed(() =>
  stockList.value
    .flatMap(e => e.dividends)
    .filter(e => +e.date.split('-')[1] == new Date().getMonth() && +e.date.split('-')[0] == new Date().getFullYear())
    .reduce((a, b) => a + +b.value, 0)
);

function getHalfYearDividendBracket(index: number) {
  return monthDividendList.value.reduce((a, b, i) => a + (i < index && i >= index - 3 ? +b[1].reduce((a, b) => a + +b)! : 0), 0);
}

function reduceDividendMonthsToGrowth(dividendArray: { [key: string]: number[] }) {
  let dividendMonths = [...Object.entries(dividendArray).map(e => [e[0], e[1].reduce((a, b) => a + +b, 0)])];
  return dividendMonths.map((e, i) => [e[0], i > 0 ? +e[1] / +dividendMonths[i - 1][1] - 1 : null]);
}
function getMonthObject(dividends: Stock['dividends']) {
  if (!dividends.length) [];
  let object: { [key: string]: number[] } = {};
  for (let dividend of dividends) {
    let dividendDate = dividend.date.split('-')[0] + dividend.date.split('-')[1];
    let current = [...(object[dividendDate] || []), +dividend.value];
    object[dividendDate] = current;
  }
  return object;
}
monthGrowthList.value = reduceDividendMonthsToGrowth(getMonthObject(stockList.value.flatMap(e => e.dividends)));
</script>
<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.monthlyDivGrid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
</style>
