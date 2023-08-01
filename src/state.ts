import { ref, watch } from 'vue';

export interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
}

export const views = ref(['I/O', 'Dividends', 'Overview', 'Import/Export'] as const);

export const stockList = ref<Stock[]>([]);
export const expenseList = ref<{ title: string; value: string }[]>([]);
export const incomeList = ref<{ title: string; value: string }[]>([]);
export const routeState = ref<(typeof views.value)[number]>('I/O');

export const lastUpdate = ref('');

function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
watch(
  stockList,
  (newValue, oldValue) => {
    setItem('Stocks', newValue);
  },
  { deep: true }
);
watch(
  incomeList,
  (newValue, oldValue) => {
    setItem('Income', newValue);
  },
  { deep: true }
);
watch(
  expenseList,
  (newValue, oldValue) => {
    setItem('Expense', newValue);
  },
  { deep: true }
);
watch(lastUpdate, (newValue, oldValue) => {
  setItem('lastUpdate', newValue);
});

(() => {
  incomeList.value = JSON.parse(localStorage.getItem('Income') || '[]');
  expenseList.value = JSON.parse(localStorage.getItem('Expense') || '[]');
  stockList.value = JSON.parse(localStorage.getItem('Stocks') || '[]');
  lastUpdate.value = JSON.parse(localStorage.getItem('lastUpdate') || '""');
})();
