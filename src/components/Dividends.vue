<template>
  <h2 class="text-center p-3">Dividends</h2>
  <form class="Stgrid mx-3" @submit.prevent="addStock()">
    <div>
      <TextInput placeholder="titel" v-model="newStockTitle"></TextInput>
    </div>
    <div class="d-flex align-items-end">
      <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
    </div>
  </form>

  <div class="m-3 mt-4">
    <Accordion :items="stockList.map(e => ({ title: e.title, hash: stringWithoutSpecialCharacters(e.title) }))">
      <template v-for="stock of stockList" #[stringWithoutSpecialCharacters(stock.title)]>
        <div>
          <form class="Stgrid m-3 mt-0" @submit.prevent="addDividend(stock.title)">
            <div>
              <TextInput placeholder="wert" v-model="newDividendValue"></TextInput>
            </div>
            <div class="d-flex align-items-end">
              <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
            </div>
          </form>
        </div>
      </template>
    </Accordion>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TextInput, Button, SelectInput, Accordion } from 'custom-mbd-components';

const newStockTitle = ref('');
const stockList = ref<Stock[]>([]);

interface Stock {
  title: string;
  amount: string;
  totalDividend: string;
}

watch(
  () => stockList.value,
  (newValue, oldValue) => {
    localStorage.setItem('Stocks', JSON.stringify(newValue));
  },
  { deep: true }
);

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
  let newStock: Stock = {
    title: newStockTitle.value,
    amount: '',
    totalDividend: '',
  };
  if (!stockList.value.find(e => e.title == newStockTitle.value)) stockList.value.push(newStock);
  localStorage.setItem('Stocks', JSON.stringify(stockList.value));
}

function addDividend(stockTitle: string) {}

function stringWithoutSpecialCharacters(string: string) {
  return string.replace(/[^a-zA-Z0-9-_]/g, '');
}
</script>
<style scoped lang="scss">
.Stgrid {
  display: grid;
  grid-template-columns: 8fr 1fr;
  gap: 5px;
}
</style>
