<script setup>
import { ref, computed, watch } from 'vue'
import UlesandeRida from './components/UlesandeRida.vue'

const ulesanded = ref([])
const uusTekst = ref("")
const tegemata = computed(() => ulesanded.value.filter(u => !u.tehtud).length)

watch(ulesanded, () => {
      localStorage.setItem('ulesanded', JSON.stringify(ulesanded.value))
    }, { deep: true })

const salvestatud = localStorage.getItem("ulesanded");
if(salvestatud){
  ulesanded.value = JSON.parse(salvestatud);
}


function lisa() {
  const puhas = uusTekst.value.trim()
  if(puhas === "") return;
  ulesanded.value.push({id: Date.now(), tekst: puhas, tehtud: false});
  uusTekst.value = ""
}

function kustuta(id){
  ulesanded.value = ulesanded.value.filter(u => u.id !== id)
}

function lulita(id){
  const u = ulesanded.value.find(u => u.id === id)
  u.tehtud = !u.tehtud
}

</script>



<template>
  <form @submit.prevent="lisa">
    <label for="uus">Lisa ülesanne:</label>
    <input id="uus" v-model="uusTekst">
    <button type="submit">Lisa</button>
  </form>

  <p> {{ tegemata }}, tegemata, {{ ulesanded.length }} kokku</p>

  <p v-if="ulesanded.length === 0">Ülesandeid pole veel.</p>

  <ul>
    <UlesandeRida v-for="u in ulesanded" :key="u.id"
      :ulesanne="u" @kustuta="kustuta" @lulita="lulita" />
  </ul>
</template>


<style>

</style>
