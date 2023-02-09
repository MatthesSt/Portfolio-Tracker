import { ref, watch } from 'vue';
import { getCurrentDateTime } from './utils';

interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
}
export type Saving = { title: string; value: string; rate: 'm' | 'q' | 'h' | 'y'; id: string };

export const views = ref(['I/O', 'Dividends', 'Saving', 'Overview'] as const);

export const stockList = ref<Stock[]>([]);
export const expenseList = ref<{ title: string; value: string }[]>([]);
export const incomeList = ref<{ title: string; value: string }[]>([]);
export const payinList = ref<{ date: string; value: string }[]>([]);
export const savingList = ref<Saving[]>([]);
export const lastUpdated = ref('');
export const routeState = ref<typeof views.value[number]>('I/O');

function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
function updateUpdatedAt() {
  setItem('lastUpdated', getCurrentDateTime());
}

watch(
  stockList,
  (newValue, oldValue) => {
    setItem('Stocks', newValue);
    updateUpdatedAt();
  },
  { deep: true }
);
watch(
  incomeList,
  (newValue, oldValue) => {
    setItem('Income', newValue);
    updateUpdatedAt();
  },
  { deep: true }
);
watch(
  expenseList,
  (newValue, oldValue) => {
    setItem('Expense', newValue);
    updateUpdatedAt();
  },
  { deep: true }
);
watch(
  payinList,
  (newValue, oldValue) => {
    setItem('Payin', newValue);
    updateUpdatedAt();
  },
  { deep: true }
);
watch(
  savingList,
  (newValue, oldValue) => {
    setItem('Saving', newValue);
    updateUpdatedAt();
  },
  { deep: true }
);

function init() {
  incomeList.value = JSON.parse(localStorage.getItem('Income') || '[]');
  expenseList.value = JSON.parse(localStorage.getItem('Expense') || '[]');
  savingList.value = JSON.parse(localStorage.getItem('Saving') || '[]');
  payinList.value = JSON.parse(localStorage.getItem('Payin') || '[]');
  stockList.value = JSON.parse(localStorage.getItem('Stocks') || '[]');
  lastUpdated.value = JSON.parse(localStorage.getItem('lastUpdated') || '');
}
init();
