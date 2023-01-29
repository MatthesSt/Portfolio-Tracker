<template>
  <h2 class="text-center p-3">Einkommen and Ausgaben</h2>
  <div id="incomeContainer" class="mb-3">
    <h4 class="text-center">Einkommen</h4>
    <form class="IEgrid" @submit.prevent="addIncome()">
      <div>
              <TextInput placeholder="titel" v-model="newIncomeTitle" required></TextInput>
      </div>
      <div>
              <TextInput placeholder="wert" v-model="newIncomeValue" required></TextInput>
      </div>
      <div class="d-flex align-items-end">
        <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
      </div>
    </form>
    <div class="mt-3 overflow-auto" style="max-height: 20vh">
      <div class="IEgrid" v-for="Income of IncomeList">
        <div>
          <TextInput placeholder="titel" v-model="Income.title">{{ Income.title }}</TextInput>
        </div>
        <div>
          <TextInput placeholder="wert" v-model="Income.value">{{ Income.title }}</TextInput>
        </div>
        <div class="d-flex align-items-end">
          <Button class="btn btn-danger" @click.stop="deleteIncome(Income)"><i class="fas fa-trash"></i></Button>
        </div>
      </div>
    </div>
  </div>
  <div id="expenseContainer">
    <h4 class="text-center">Ausgaben</h4>
    <form class="IEgrid" @submit.prevent="addExpense()">
      <div>
              <TextInput placeholder="titel" v-model="newExpenseTitle" required></TextInput>
      </div>
      <div>
              <TextInput placeholder="wert" v-model="newExpenseValue" required></TextInput>
      </div>
      <div class="d-flex align-items-end">
        <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
      </div>
    </form>
    <div class="mt-3 overflow-auto" style="max-height: 22vh">
      <div class="IEgrid" v-for="Expense of ExpenseList">
        <div>
          <TextInput placeholder="titel" v-model="Expense.title">{{ Expense.title }}</TextInput>
        </div>
        <div>
          <TextInput placeholder="wert" v-model="Expense.value">{{ Expense.title }}</TextInput>
        </div>
        <div class="d-flex align-items-end">
          <Button class="btn btn-danger" @click.stop="deleteExpense(Expense)"><i class="fas fa-trash"></i></Button>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 h2">
    Gesamt:
    {{ (IncomeList.reduce(listReducer, 0) - ExpenseList.reduce(listReducer, 0)).toFixed(2) }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Button, TextInput } from 'custom-mbd-components';

type LSItem = { title: string; value: string };

const newIncomeTitle = ref('');
const newIncomeValue = ref('');
const IncomeList = ref<LSItem[]>([]);

const newExpenseTitle = ref('');
const newExpenseValue = ref('');
const ExpenseList = ref<LSItem[]>([]);

const listReducer = (a: number, b: LSItem) => a + +b.value.replace(',', '.');

watch(
  () => IncomeList.value,
  (newValue, oldValue) => {
    localStorage.setItem('Income', JSON.stringify(newValue));
  },
  { deep: true }
);
watch(
  () => ExpenseList.value,
  (newValue, oldValue) => {
    localStorage.setItem('Expense', JSON.stringify(newValue));
  },
  { deep: true }
);

function init() {
  let storageIncome = localStorage.getItem('Income') || '';
  let storageExpense = localStorage.getItem('Expense') || '';
  try {
    IncomeList.value = JSON.parse(storageIncome);
    ExpenseList.value = JSON.parse(storageExpense);
  } catch (e) {
    IncomeList.value = [];
    ExpenseList.value = [];
  }
}
init();

function addIncome() {
  let newIncome = <LSItem>{
    title: newIncomeTitle.value,
    value: newIncomeValue.value,
  };
  IncomeList.value.push(newIncome);
  newIncomeTitle.value = '';
  newIncomeValue.value = '';
}
function addExpense() {
  let newExpense = <LSItem>{
    title: newExpenseTitle.value,
    value: newExpenseValue.value,
  };
  ExpenseList.value.push(newExpense);
  newExpenseTitle.value = '';
  newExpenseValue.value = '';
}

function deleteIncome(Income: LSItem) {
  IncomeList.value = IncomeList.value.filter(e => e.title != Income.title && e.value != Income.value);
}
function deleteExpense(Expense: LSItem) {
  ExpenseList.value = ExpenseList.value.filter(e => e.title != Expense.title && e.value != Expense.value);
}
</script>
<style scoped lang="scss">
.IEgrid {
  display: grid;
  grid-template-columns: 5fr 5fr 1fr;
  gap: 5px;
  padding-inline: 10px;
}
</style>
