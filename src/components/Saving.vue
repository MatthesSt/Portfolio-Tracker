<template>
  <View title="Sparen">
    <div>
      <form class="row g-2 mx-2" @submit.prevent="addSaving()">
        <div class="col-4">
          <TextInput placeholder="titel" v-model="newSavingTitle" required></TextInput>
        </div>
        <div class="col-4">
          <TextInput placeholder="wert" v-model="newSavingValue" required></TextInput>
        </div>
        <div class="text-dark col-2">
          <SelectInput controlInput showAll v-model="newSavingRate" placeholder="rate" :options="['m', 'q', 'h', 'y']"></SelectInput>
        </div>
        <div class="d-flex align-items-end col-2">
          <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
        </div>
      </form>
      <div class="my-3 overflow-auto" style="max-height: 40vh">
        <div class="row g-2 mx-2" v-for="saving of savingList">
          <div class="col-5">
            <TextInput placeholder="titel" v-model="saving.title">{{ saving.title }}</TextInput>
          </div>
          <div class="col-5">
            <TextInput placeholder="wert" v-model="saving.value">{{ saving.title }}</TextInput>
          </div>
          <div class="d-flex align-items-end col-2">
            <Button class="btn btn-danger" @click.stop="deleteSaving(saving)"><i class="fas fa-trash"></i></Button>
          </div>
        </div>
      </div>
      <div class="px-4 h2">
        Gesamt:
        {{ savingList.reduce((a, b) => a + +b.value, 0).toFixed(2) }}
      </div>
    </div>
  </View>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import View from './View.vue';
import { TextInput, Button, SelectInput } from 'custom-mbd-components';
import { savingList } from '../state';
import type { Saving } from '../state';

const newSavingRate = ref<Saving['rate']>('m');
const newSavingTitle = ref('');
const newSavingValue = ref('');

function addSaving() {
  savingList.value.push({
    title: newSavingTitle.value,
    value: newSavingValue.value,
    rate: newSavingRate.value,
    id: JSON.stringify(Math.random()),
  });
}
function deleteSaving(saving: Saving) {
  savingList.value = savingList.value.filter(e => e.id != saving.value);
}
</script>
