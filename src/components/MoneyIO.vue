<template>
  <View title="Einkommen and Ausgaben">
    <div class="m-3">
      <Accordion
        :items="[
          {
            title: `Einkommen (${incomeList.reduce(listReducer, 0).toFixed(2)})`,
            hash: 'Einkommen',
          },
          {
            title: `Ausgaben (${expenseList.reduce(listReducer, 0).toFixed(2)})`,
            hash: 'Ausgaben',
          },
          {
            title: `Einzahlungen (${payinList.reduce((a, b) => a + +b.value.replace(',', '.'), 0).toFixed(2)})`,
            hash: 'Einzahlungen',
          },
        ]"
      >
        <template #Einkommen>
          <div id="incomeContainer" class="mb-3">
            <form class="IEgrid pb-2" @submit.prevent="addIncome()" style="border-bottom: 1px solid black">
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
            <div class="mt-3 overflow-auto" style="max-height: 40vh">
              <div class="IEgrid" v-for="Income of incomeList">
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
        </template>
        <template #Ausgaben>
          <div id="expenseContainer" class="mb-3">
            <form class="IEgrid pb-2" @submit.prevent="addExpense()" style="border-bottom: 1px solid black">
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
            <div class="mt-3 overflow-auto" style="max-height: 40vh">
              <div class="IEgrid" v-for="Expense of expenseList">
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
              <div class="mx-3 py-2" style="border-bottom: 1px solid black">Sparen</div>
              <div class="IEgrid" v-for="saving of savingList">
                <div>
                  <TextInput placeholder="titel" v-model="saving.title" disabled>{{ saving.title }}</TextInput>
                </div>
                <div>
                  <TextInput placeholder="wert" v-model="saving.value" disabled>{{ saving.value }}</TextInput>
                </div>
                <div style="width: 42px"></div>
              </div>
            </div>
          </div>
        </template>
        <template #Einzahlungen>
          <form class="IEgrid pb-2" @submit.prevent="addPayin()" style="border-bottom: 1px solid black">
            <div>
              <DateInput placeholder="datum" v-model="newPayinDate" required></DateInput>
            </div>
            <div>
              <TextInput placeholder="wert" v-model="newPayinValue" required></TextInput>
            </div>
            <div class="d-flex align-items-end">
              <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
            </div>
          </form>
          <div class="mt-3 overflow-auto py-2" style="max-height: 40vh">
            <div class="IEgrid" v-for="Payin of payinList">
              <div>
                <DateInput placeholder="datum" v-model="Payin.date">{{ Payin.date }}</DateInput>
              </div>
              <div>
                <TextInput placeholder="wert" v-model="Payin.value">{{ Payin.value }}</TextInput>
              </div>
              <div class="d-flex align-items-end">
                <Button class="btn btn-danger" @click.stop="deletePayin(Payin)"><i class="fas fa-trash"></i></Button>
              </div>
            </div>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="px-4 h2">
      Gesamt:
      {{ (incomeList.reduce(listReducer, 0) - expenseList.reduce(listReducer, 0) - savingList.reduce(listReducer, 0)).toFixed(2) }}
    </div>
  </View>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Button, TextInput, Accordion, DateInput } from 'custom-mbd-components';
import View from './View.vue';
import { expenseList, incomeList, payinList, savingList } from '../state';

const newIncomeTitle = ref('');
const newIncomeValue = ref('');

const newExpenseTitle = ref('');
const newExpenseValue = ref('');

const newPayinDate = ref('');
const newPayinValue = ref('');

const listReducer = (a: number, b: { title: string; value: string }) => a + +b.value.replace(',', '.');

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
function addPayin() {
  let newPayin = {
    date: newPayinDate.value,
    value: newPayinValue.value,
  };
  payinList.value.push(newPayin);
  newPayinDate.value = '';
  newPayinValue.value = '';
}

function deleteIncome(Income: { title: string; value: string }) {
  incomeList.value = incomeList.value.filter(e => e.title != Income.title && e.value != Income.value);
}
function deleteExpense(Expense: { title: string; value: string }) {
  expenseList.value = expenseList.value.filter(e => e.title != Expense.title && e.value != Expense.value);
}
function deletePayin(Payin: { date: string; value: string }) {
  payinList.value = payinList.value.filter(e => e.date != Payin.date && e.value != Payin.value);
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
