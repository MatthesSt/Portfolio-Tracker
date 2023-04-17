<template>
  <View title="Overview">
    <div class="p-3">
      <table class="w-100">
        <tr class="border-bottom">
          <td>Gesamte Dividende</td>
          <td>{{ totalDividend.toFixed(2) }}€</td>
        </tr>
        <tr class="border-bottom">
          <td>Dividende Letzen Monat</td>
          <td>{{ lastMonthDividend.toFixed(2) }}€</td>
        </tr>
        <tr class="border-bottom">
          <td>Sparrate</td>
          <td>{{ totalSaving }}€/m</td>
        </tr>
        <tr class="border-bottom">
          <td>Durchscnittliche Dividende</td>
          <td>{{ (totalDividend / dividendMonths).toFixed(2) }}€/m</td>
        </tr>
      </table>
      <table class="mt-5" style="width: 100%; max-height: 60vh; overflow: auto">
        <thead>
          <tr>
            <td>Monat</td>
            <td>Dividende</td>
            <td>Wachstum</td>
          </tr>
        </thead>
        <tbody>
          <template v-for="(entry,index) in (monthGrowthList as [string,number][])">
            <tr class="customBorder" v-if="index && !((+entry[0].substring(4) - 1) % 3)">
              <td>Q{{ Math.floor((+entry[0].substring(4) - 1) / 3) || 4 }} {{ +entry[0].substring(0, 4) }}</td>
              <td>{{ getQuarterDividends(index).toFixed(2) }}</td>
              <td>
                {{
                  (
                    Math.round((getQuarterDividends(index) / (getQuarterDividends(index - 3) || getQuarterDividends(index)) - 1) * 10000) / 100
                  ).toFixed(2)
                }}%
              </td>
            </tr>
            <tr v-if="+entry[0].substring(0, 4) == currentYear">
              <td>
                {{
                  new Date(+entry[0].substring(0, 4), +entry[0].substring(4) - 1, 1).toLocaleString('default', { year: '2-digit', month: 'short' })
                }}
              </td>
              <td>{{ monthDividendList[index][1].reduce((a, b) => a + b, 0).toFixed(2) }}</td>
              <td v-if="index !== 0">{{ Math.round(+entry[1] * 10000) / 100 || 0 }}%</td>
            </tr>
          </template>
        </tbody>
      </table>
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

function getQuarterDividends(index: number) {
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
