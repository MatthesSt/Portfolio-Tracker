<template>
  <View title="Overview">
    <div class="p-3 grid">
      <div class="p-3 row g-2 mx-2">
        <div class="col-8">Zuletzt Aktualisiert:</div>
        <div class="col-4">{{ lastUpdated }}</div>
        <div class="col-8">Gesamte Dividende:</div>
        <div class="col-4">{{ totalDividend.toFixed(2) }}€</div>
        <div class="col-8">Dividende Letzen Monat:</div>
        <div class="col-4">{{ lastMonthDividend.toFixed(2) }}€</div>
        <div class="col-8">Sparrate:</div>
        <div class="col-4">{{ totalSaving }}€/m</div>
        <div class="col-8">Durchscnittliche Dividende:</div>
        <div class="col-4">{{ totalDividend / dividendMonths }}€/m</div>
      </div>
      <div class="px-3">Dividendenwachstum pro Monat:</div>
      <div class="px-3 py-2 overflow-auto" style="max-height: 60vh">
        <div class="row g-2 mx-2 pb-2">
          <div class="col-6">Monat</div>
          <div class="col-3">Dividende</div>
          <div class="col-3">Wachstum</div>
        </div>
        <div class="row g-2 mx-2" v-for="(entry,index) in (monthGrowthList as [string,number][]) ">
          <div class="col-6 customBorder" v-if="index && !((+entry[0].substring(4) - 1) % 3)">
            Q{{ Math.floor((+entry[0].substring(4) - 1) / 3) || 4 }} {{ +entry[0].substring(0, 4) }}
          </div>
          <div class="col-3 customBorder" v-if="index && !((+entry[0].substring(4) - 1) % 3)">
            {{ getHalfYearDividendBracket(index).toFixed(2) }}
          </div>
          <div class="col-3 customBorder" v-if="index && !((+entry[0].substring(4) - 1) % 3)">
            {{
              (
                Math.round(
                  (getHalfYearDividendBracket(index) / (getHalfYearDividendBracket(index - 3) || getHalfYearDividendBracket(index)) - 1) * 10000
                ) / 100
              ).toFixed(2)
            }}%
          </div>
          <div v-if="+entry[0].substring(0, 4) == currentYear"></div>
          <div class="col-6">
            {{ new Date(+entry[0].substring(0, 4), +entry[0].substring(4) - 1, 1).toLocaleString('default', { year: '2-digit', month: 'short' }) }}:
          </div>
          <div class="col-3">{{ monthDividendList[index][1].reduce((a, b) => a + b, 0).toFixed(2) }}</div>
          <div class="col-3" v-if="index">{{ Math.round(+entry[1] * 10000) / 100 || 0 }}%</div>
        </div>
      </div>
    </div>
  </View>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import View from './View.vue';
import { savingList, stockList, lastUpdated } from '../state';

interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
}

const monthGrowthList = ref<(string | number | null)[][]>([]);

const currentYear = +(new Date() + '').substring(11, 15);

const dividendMonths = computed(() => {
  let firstEntry = stockList.value.flatMap(e => e.dividends).sort((a, b) => (a.date > b.date ? 1 : -1))[0];
  let lastEntry = stockList.value
    .flatMap(e => e.dividends)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .at(-1);
  return (
    (+lastEntry!.date.substring(0, 4) - +firstEntry!.date.substring(0, 4)) * 12 +
    1 +
    +lastEntry!.date.substring(5, 7) -
    +firstEntry!.date.substring(5, 7)
  );
});

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
.customBorder {
  border-top: 1px white dashed;
  border-bottom: 1px solid white;
}
</style>
