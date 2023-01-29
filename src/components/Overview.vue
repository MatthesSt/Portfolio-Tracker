<template>
  <View title="Overview">
    <div class="p-3 grid">
      <div>Gesamte Dividende:</div>
      <div>{{ totalDividend }}€</div>
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

const Stocks = ref<Stock[]>([]);
const IncomeList = ref<LSItem[]>([]);
const ExpenseList = ref<LSItem[]>([]);

const totalDividend = computed(() => Stocks.value.flatMap(e => e.dividends).reduce((a, b) => a + +b.value, 0));

function getStats() {
  Stocks.value = JSON.parse(localStorage.getItem('Stocks') || '');
  IncomeList.value = JSON.parse(localStorage.getItem('Income') || '');
  ExpenseList.value = JSON.parse(localStorage.getItem('Expense') || '');
}
getStats();
</script>
<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
