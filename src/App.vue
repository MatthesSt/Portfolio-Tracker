<template>
  <main class="bg-dark text-light">
    <section v-if="routeState == 'Money I/O'">
      <h2 class="text-center p-3">Einkommen and Ausgaben</h2>
      <div id="incomeContainer" class="mb-3">
        <h4 class="text-center">Einkommen</h4>
        <form class="IEgrid" @submit.prevent="addIncome()">
          <div>
            <TextInput placeholder="titel" v-model="newIncomeTitle"></TextInput>
          </div>
          <div>
            <TextInput placeholder="wert" v-model="newIncomeValue"></TextInput>
          </div>
          <div class="d-flex align-items-end">
            <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
          </div>
        </form>
        <div class="mt-3 overflow-auto" style="max-height: 20vh">
          <div class="IEgrid" v-for="Income of IncomeList">
            <div>
              <TextInput placeholder="titel" v-model="Income.title">{{
                Income.title
              }}</TextInput>
            </div>
            <div>
              <TextInput placeholder="wert" v-model="Income.value">{{
                Income.title
              }}</TextInput>
            </div>
            <div class="d-flex align-items-end">
              <Button class="btn btn-danger" @click.stop="deleteIncome(Income)"
                ><i class="fas fa-trash"></i
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <div id="expenseContainer">
        <h4 class="text-center">Ausgaben</h4>
        <form class="IEgrid" @submit.prevent="addExpense()">
          <div>
            <TextInput
              placeholder="titel"
              v-model="newExpenseTitle"
            ></TextInput>
          </div>
          <div>
            <TextInput placeholder="wert" v-model="newExpenseValue"></TextInput>
          </div>
          <div class="d-flex align-items-end">
            <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
          </div>
        </form>
        <div class="mt-3 overflow-auto" style="max-height: 30vh">
          <div class="IEgrid" v-for="Expense of ExpenseList">
            <div>
              <TextInput placeholder="titel" v-model="Expense.title">{{
                Expense.title
              }}</TextInput>
            </div>
            <div>
              <TextInput placeholder="wert" v-model="Expense.value">{{
                Expense.title
              }}</TextInput>
            </div>
            <div class="d-flex align-items-end">
              <Button
                class="btn btn-danger"
                @click.stop="deleteExpense(Expense)"
                ><i class="fas fa-trash"></i
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 h2">
        Gesamt:
        {{
          IncomeList.reduce((a, b) => a + +b.value, 0) -
          ExpenseList.reduce((a, b) => a + +b.value, 0)
        }}
      </div>
    </section>
    <section v-if="routeState == 'Dividends'">
      <h2 class="text-center p-3">Dividends</h2>
    </section>
    <section v-if="routeState == 'Overview'">
      <h2 class="text-center p-3">Overview</h2>
    </section>
    <footer class="row g-0 w-100">
      <div
        v-for="section of views"
        class="col-4 text-center bg-success text-light border border-sm border-dark"
      >
        <div class="p-2" @click.stop="routeState = section">{{ section }}</div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Button, TextInput } from "custom-mbd-components";

const views = ref(["Money I/O", "Dividends", "Overview"] as const);
const routeState = ref<typeof views.value[number]>("Money I/O");

type LSItem = { title: string; value: string };

const newIncomeTitle = ref("");
const newIncomeValue = ref("");
const IncomeList = ref<LSItem[]>([]);

const newExpenseTitle = ref("");
const newExpenseValue = ref("");
const ExpenseList = ref<LSItem[]>([]);

watch(
  () => IncomeList.value,
  (newValue, oldValue) => {
    localStorage.setItem("Income", JSON.stringify(newValue));
  },
  { deep: true }
);
watch(
  () => ExpenseList.value,
  (newValue, oldValue) => {
    localStorage.setItem("Expense", JSON.stringify(newValue));
  },
  { deep: true }
);

function init() {
  let storageIncome = localStorage.getItem("Income") || "";
  let storageExpense = localStorage.getItem("Expense") || "";
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
}
function addExpense() {
  let newExpense = <LSItem>{
    title: newExpenseTitle.value,
    value: newExpenseValue.value,
  };
  ExpenseList.value.push(newExpense);
}

function deleteIncome(Income: LSItem) {
  IncomeList.value = IncomeList.value.filter(
    (e) => e.title != Income.title && e.value != Income.value
  );
}
function deleteExpense(Expense: LSItem) {
  ExpenseList.value = ExpenseList.value.filter(
    (e) => e.title != Expense.title && e.value != Expense.value
  );
}
</script>
<style scoped lang="scss">
main {
  height: 100vh;
}
footer {
  position: absolute;
  bottom: 0;
}
.IEgrid {
  display: grid;
  grid-template-columns: 5fr 5fr 1fr;
  gap: 5px;
  padding-inline: 10px;
}
</style>
