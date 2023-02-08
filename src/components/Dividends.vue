<template>
  <View title="Dividends">
    <form class="Stgrid mx-3" @submit.prevent="addStock()">
      <div>
        <TextInput placeholder="titel" v-model="newStockTitle" required></TextInput>
      </div>
      <div class="d-flex align-items-end">
        <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
      </div>
    </form>

    <div class="m-3 mt-4" style="max-height: 60vh; overflow: auto">
      <Accordion
        :items="
          stockList.map(e => ({
            title: `${e.title} (${e.dividends.reduce(listReducer, 0).toFixed(2)})`,
            hash: stringWithoutSpecialCharacters(e.title),
          }))
        "
      >
        <template v-for="(stock, stockIndex) of stockList" #[stringWithoutSpecialCharacters(stock.title)]>
          <div>
            <form class="Divgrid mx-3 mb-3" @submit.prevent="addDividend(stock.title)">
              <div>
                <TextInput placeholder="wert" v-model="newDividendValue" required></TextInput>
              </div>
              <div>
                <DateInput placeholder="datum" v-model="newDividendDate" required></DateInput>
              </div>
              <div class="d-flex align-items-end">
                <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
              </div>
            </form>
            <div class="mt-3 overflow-auto" style="max-height: 20vh">
              <div class="Divgrid mx-3 mb-3" v-for="(dividend, dividendIndex) in stock.dividends.reverse()">
                <div>
                  <TextInput placeholder="wert" v-model="dividend.value">{{ dividend.value }}</TextInput>
                </div>
                <div>
                  <TextInput placeholder="datum" v-model="dividend.date">{{ dividend.date }}</TextInput>
                </div>
                <div class="d-flex align-items-end">
                  <Button class="btn btn-danger" @click.stop="deleteDividend(stockIndex, dividendIndex)"><i class="fas fa-trash"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Accordion>
    </div>
    <div class="px-4 h2">
      Gesamt:
      {{
        stockList
          .flatMap(e => e.dividends)
          .reduce(listReducer, 0)
          .toFixed(2)
      }}
    </div>
  </View>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TextInput, Button, Accordion, DateInput } from 'custom-mbd-components';
import View from './View.vue';

const newStockTitle = ref('');
const stockList = ref<Stock[]>([]);
const newDividendDate = ref('');
const newDividendValue = ref('');

const listReducer = (a: number, b: Stock['dividends'][number]) => a + +b.value.replace(',', '.');

interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
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
    dividends: [],
  };
  if (!stockList.value.find(e => e.title == newStockTitle.value)) stockList.value.push(newStock);
  localStorage.setItem('Stocks', JSON.stringify(stockList.value));
}

function addDividend(stockTitle: string) {
  stockList.value
    .find(e => e.title == stockTitle)
    ?.dividends.push({
      value: newDividendValue.value,
      date: newDividendDate.value,
    });
  newDividendValue.value = '';
  newDividendDate.value = '';
}
function deleteDividend(stockIndex: number, dividendIndex: number) {
  stockList.value[stockIndex].dividends = stockList.value[stockIndex].dividends.filter((e, i) => i != dividendIndex);
}

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
.Divgrid {
  display: grid;
  grid-template-columns: 3fr 5fr 1fr;
  gap: 5px;
}
</style>
