<template>
  <View title="Dividends">
    <form class="row g-0 mx-3" @submit.prevent="addStock()">
      <div class="col-10">
        <TextInput placeholder="titel" v-model="newStockTitle" required></TextInput>
      </div>
      <div class="d-flex align-items-end justify-content-end col-2">
        <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
      </div>
    </form>

    <div class="m-3 mt-4" style="">
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
            <form class="row g-2 mx-2 mb-3" @submit.prevent="addDividend(stock.title)">
              <div class="col-4">
                <TextInput placeholder="wert" v-model="newDividendValue" required></TextInput>
              </div>
              <div class="col-6">
                <DateInput placeholder="datum" v-model="newDividendDate" required></DateInput>
              </div>
              <div class="d-flex align-items-end col-2">
                <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
              </div>
            </form>
            <div class="overflow-auto" style="max-height: 20vh">
              <div class="row g-2 mx-2 mb-3" v-for="(dividend, dividendIndex) in stock.dividends">
                <div class="col-4">
                  <TextInput placeholder="wert" v-model="dividend.value">{{ dividend.value }}</TextInput>
                </div>
                <div class="col-6">
                  <TextInput placeholder="datum" v-model="dividend.date">{{ dividend.date }}</TextInput>
                </div>
                <div class="d-flex align-items-end col-2">
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
import { ref } from 'vue';
import { TextInput, Button, Accordion, DateInput } from 'custom-mbd-components';
import View from './View.vue';
import { stockList } from '../state';

const newStockTitle = ref('');
const newDividendDate = ref('');
const newDividendValue = ref('');

const listReducer = (a: number, b: Stock['dividends'][number]) => a + +b.value.replace(',', '.');

interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
}

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
