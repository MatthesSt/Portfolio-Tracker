<template>
  <View title="Sparen">
    <div>
      <form class="Fgrid" @submit.prevent="addSaving()">
        <div>
          <TextInput placeholder="titel" v-model="newSavingTitle" required></TextInput>
        </div>
        <div>
          <TextInput placeholder="wert" v-model="newSavingValue" required></TextInput>
        </div>
        <div class="text-dark">
          <SelectInput controlInput showAll v-model="newSavingRate" placeholder="rate" :options="['m', 'q', 'h', 'y']"></SelectInput>
        </div>
        <div class="d-flex align-items-end">
          <Button class="btn btn-success"><i class="fas fa-save"></i></Button>
        </div>
      </form>
      <div class="mt-3 overflow-auto" style="max-height: 40vh">
        <div class="Sgrid" v-for="saving of savingList">
          <div>
            <TextInput placeholder="titel" v-model="saving.title">{{ saving.title }}</TextInput>
          </div>
          <div>
            <TextInput placeholder="wert" v-model="saving.value">{{ saving.title }}</TextInput>
          </div>
          <div class="d-flex align-items-end">
            <Button class="btn btn-danger" @click.stop="deleteSaving(saving)"><i class="fas fa-trash"></i></Button>
          </div>
        </div>
      </div>
      <div class="p-4 h2">
        Gesamt:
        {{ savingList.reduce((a, b) => a + +b.value, 0).toFixed(2) }}
      </div>
    </div>
  </View>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import View from './View.vue';
import { TextInput, Button, SelectInput } from 'custom-mbd-components';

type Saving = { title: string; value: string; rate: 'm' | 'q' | 'h' | 'y'; id: string };

const newSavingRate = ref<Saving['rate']>('m');
const newSavingTitle = ref('');
const newSavingValue = ref('');
const savingList = ref<Saving[]>([]);

watch(
  () => savingList.value,
  (newValue, oldValue) => {
    localStorage.setItem('Saving', JSON.stringify(newValue));
  },
  { deep: true }
);

function init() {
  savingList.value = JSON.parse(localStorage.getItem('Saving') || '[]');
}
init();
function addSaving() {
  savingList.value.push({
    title: newSavingTitle.value,
    value: newSavingValue.value,
    rate: newSavingRate.value,
    id: JSON.stringify(Math.random()),
  });
}
function deleteSaving(saving: Saving) {
  console.log(saving.id);
  savingList.value = savingList.value.filter(e => e.id != saving.value);
}
</script>
<style lang="scss">
.Fgrid {
  display: grid;
  grid-template-columns: 4fr 4fr 2fr 1fr;
  gap: 5px;
  padding-inline: 10px;
}
.Sgrid {
  display: grid;
  grid-template-columns: 5fr 5fr 1fr;
  gap: 5px;
  padding-inline: 10px;
}
</style>
