import { ref, watch } from 'vue';

interface Stock {
  title: string;
  amount: string;
  dividends: { value: string; date: string }[];
}
type LSItem = { title: string; value: string } | { date: string; value: string };

export const views = ref(['I/O', 'Dividends', 'Saving', 'Overview'] as const);

export const stockList = ref<Stock[]>([]);
export const expenseList = ref<LSItem[]>([]);
export const incomeList = ref<LSItem[]>([]);
export const payinList = ref<LSItem[]>([]);
export const savingList = ref<{ title: string; value: string; rate: string; id: string }[]>([]);
export const lastUpdated = ref('');
export const routeState = ref<typeof views.value[number]>('I/O');

watch(
  routeState,
  (newValue, oldValue) => {
    localStorage.setItem('lastRoute', JSON.stringify(`${newValue},${new Date().toLocaleDateString()},${new Date().toLocaleTimeString()}`));
  },
  { deep: true }
);
