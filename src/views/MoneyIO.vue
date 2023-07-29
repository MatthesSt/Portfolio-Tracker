<template>
  <View title="Einkommen and Ausgaben">
    <div class="m-3">
      <Accordion
        :items="[
          {
            title: `Einkommen (${reduceSum(incomeList).toFixed(2)})`,
            hash: 'Einkommen',
          },
          {
            title: `Ausgaben (${reduceSum(expenseList).toFixed(2)})`,
            hash: 'Ausgaben',
          }
        ]"
      >
        <template #Einkommen>
          <div id="incomeContainer" class="mb-3">
            <form class="row g-2 mx-2 pb-2" @submit.prevent="addIncome()" style="border-bottom: 1px solid black">
              <div class="col-5">
                <TextInput placeholder="titel" v-model="newIncomeTitle" required></TextInput>
              </div>
              <div class="col-5">
                <TextInput placeholder="wert" v-model="newIncomeValue" required></TextInput>
              </div>
              <div class="d-flex align-items-end col-2">
                <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
              </div>
            </form>
            <div class="mt-3 overflow-auto" style="max-height: 40vh">
              <div class="row g-2 mx-2" v-for="Income of incomeList">
                <div class="col-5">
                  <TextInput placeholder="titel" v-model="Income.title">{{ Income.title }}</TextInput>
                </div>
                <div class="col-5">
                  <TextInput placeholder="wert" v-model="Income.value">{{ Income.title }}</TextInput>
                </div>
                <div class="d-flex align-items-end col-2">
                  <Button class="btn btn-danger" @click.stop="deleteIncome(Income)"><i class="fas fa-trash"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #Ausgaben>
          <div id="expenseContainer" class="mb-3">
            <form class="row g-2 mx-2 pb-2" @submit.prevent="addExpense()" style="border-bottom: 1px solid black">
              <div class="col-5">
                <TextInput placeholder="titel" v-model="newExpenseTitle" required></TextInput>
              </div>
              <div class="col-5">
                <TextInput placeholder="wert" v-model="newExpenseValue" required></TextInput>
              </div>
              <div class="d-flex align-items-end col-2">
                <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
              </div>
            </form>
            <div class="mt-3 overflow-auto" style="max-height: 40vh">
              <div class="row g-2 mx-2" v-for="Expense of expenseList">
                <div class="col-5">
                  <TextInput placeholder="titel" v-model="Expense.title">{{ Expense.title }}</TextInput>
                </div>
                <div class="col-5">
                  <TextInput placeholder="wert" v-model="Expense.value">{{ Expense.title }}</TextInput>
                </div>
                <div class="d-flex align-items-end col-2">
                  <Button class="btn btn-danger" @click.stop="deleteExpense(Expense)"><i class="fas fa-trash"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Accordion>
    </div>
  </View>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Button, TextInput, Accordion } from 'custom-mbd-components';
import View from '../components/View.vue';
import { expenseList, incomeList } from '../state';
import { reduceSum } from '../utils';

const newIncomeTitle = ref('');
const newIncomeValue = ref('');

const newExpenseTitle = ref('');
const newExpenseValue = ref('');


function addIncome() {
  let newIncome = {
    title: newIncomeTitle.value,
    value: newIncomeValue.value,
  };
  incomeList.value.push(newIncome);
  newIncomeTitle.value = '';
  newIncomeValue.value = '';
}
function addExpense() {
  let newExpense = {
    title: newExpenseTitle.value,
    value: newExpenseValue.value,
  };
  expenseList.value.push(newExpense);
  newExpenseTitle.value = '';
  newExpenseValue.value = '';
}

function deleteIncome(Income: { title: string; value: string }) {
  incomeList.value = incomeList.value.filter(e => e.title != Income.title && e.value != Income.value);
}
function deleteExpense(Expense: { title: string; value: string }) {
  expenseList.value = expenseList.value.filter(e => e.title != Expense.title && e.value != Expense.value);
}
</script>
