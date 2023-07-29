<template>
<View title="Import/Export">
   <div class="m-3">
    <Button class="w-100 btn btn-primary" @click.stop="exportData">Copy data to Clipboard</Button>
    <Button class="w-100 btn btn-primary mt-2" @click.stop="importData">Import data from Clipboard</Button>
   </div>
</View>
</template>
<script setup lang="ts">
import View from '../components/View.vue';
import { Button } from 'custom-mbd-components';
import { stockList, incomeList, expenseList } from '../state';

function exportData(){
    navigator.clipboard.writeText(JSON.stringify({stockList:stockList.value,incomeList:incomeList.value, expenseList:expenseList.value}));
}
function importData(){
    navigator.clipboard.readText().then(text => {
        let data = JSON.parse(text);
        if(!data.stockList || !data.incomeList || !data.expenseList){
            return alert('Invalid data');
        }
        stockList.value = data.stockList;
        incomeList.value = data.incomeList;
        expenseList.value = data.expenseList;
    });
}
</script>
<style scoped lang="scss"></style>