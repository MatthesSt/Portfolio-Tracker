<template>
  <h2 class="text-center p-3">Dividends</h2>
  <form class="Stgrid" @submit.prevent="addStock()">
    <div>
      <TextInput placeholder="titel" v-model="newStockTitle"></TextInput>
    </div>
    <div class="d-flex align-items-end">
      <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
    </div>
  </form>
  <div class="Segrid" v-if="stockList.length > 0">
    <SelectInput placeholder="Aktie" v-model="selectedStock" :options="stockList" :option-projection="(e:any) => e"></SelectInput>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TextInput, Button, SelectInput } from 'custom-mbd-components';

const newStockTitle = ref('');
const stockList = ref<any[]>([]);
const selectedStock = ref('');

function init() {
  let storageStocks = localStorage.getItem('Stocks') || '';
  try {
    stockList.value = JSON.parse(storageStocks);
  } catch (e) {
    stockList.value = [];
  }
}
init();

function addStock() {
  if (!stockList.value.find(e => e == newStockTitle.value)) stockList.value.push(newStockTitle.value);
  localStorage.setItem('Stocks', JSON.stringify(newStockTitle.value));
}
</script>
<style scoped lang="scss">
.Stgrid {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 5px;
  padding-inline: 10px;
}
.Segrid {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 5px;
  padding-inline: 10px;
}
</style>
