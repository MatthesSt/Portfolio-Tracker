<template>
  <View title="Einkommen and Ausgaben">
    <div class="m-3">
      <Accordion
        :items="[
          {
            title: `Einkommen (${IncomeList.reduce(listReducer, 0)})`,
            hash: 'Einkommen',
          },
          {
            title: `Ausgaben (${ExpenseList.reduce(listReducer, 0)})`,
            hash: 'Ausgaben',
          },
          {
            title: `Einzahlungen (${PayinList.reduce(listReducer, 0)})`,
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
            <div class="mt-3 overflow-auto" style="max-height: 50vh">
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
            <div class="mt-3 overflow-auto" style="max-height: 50vh">
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
          <div class="mt-3 overflow-auto py-2" style="max-height: 50vh">
            <div class="IEgrid" v-for="Payin of PayinList">
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
      {{ (IncomeList.reduce(listReducer, 0) - ExpenseList.reduce(listReducer, 0) - savingList.reduce(listReducer, 0)).toFixed(2) }}
    </div>
  </View>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Button, TextInput, Accordion, DateInput } from 'custom-mbd-components';
import View from './View.vue';

type LSItem = { title: string; value: string } | { date: string; value: string };

const newIncomeTitle = ref('');
const newIncomeValue = ref('');
const IncomeList = ref<LSItem[]>([]);

const newExpenseTitle = ref('');
const newExpenseValue = ref('');
const ExpenseList = ref<LSItem[]>([]);

const newPayinDate = ref('');
const newPayinValue = ref('');
const PayinList = ref<{ date: string; value: string }[]>([]);

const savingList = ref<{ title: string; value: string; rate: string; id: string }[]>([]);

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
watch(
  () => PayinList.value,
  (newValue, oldValue) => {
    localStorage.setItem('Payin', JSON.stringify(newValue));
  },
  { deep: true }
);

function init() {
  IncomeList.value = JSON.parse(localStorage.getItem('Income') || '[]');
  ExpenseList.value = JSON.parse(localStorage.getItem('Expense') || '[]');
  savingList.value = JSON.parse(localStorage.getItem('Saving') || '[]');
  PayinList.value = JSON.parse(localStorage.getItem('Payin') || '[]');
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
function addPayin() {
  let newPayin = {
    date: newPayinDate.value,
    value: newPayinValue.value,
  };
  PayinList.value.push(newPayin);
  newPayinDate.value = '';
  newPayinValue.value = '';
}

function deleteIncome(Income: LSItem) {
  IncomeList.value = IncomeList.value.filter(e => e.title != Income.title && e.value != Income.value);
}
function deleteExpense(Expense: LSItem) {
  ExpenseList.value = ExpenseList.value.filter(e => e.title != Expense.title && e.value != Expense.value);
}
function deletePayin(Payin: { date: string; value: string }) {
  PayinList.value = PayinList.value.filter(e => e.date != Payin.date && e.value != Payin.value);
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
