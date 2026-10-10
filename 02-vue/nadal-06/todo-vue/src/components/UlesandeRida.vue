<script setup>
    const props = defineProps({ ulesanne: Object })
    const emit = defineEmits(['kustuta', 'lulita'])
</script>

<template>
    <li :class="{ tehtud: ulesanne.tehtud }">
        <input type="checkbox" :checked="ulesanne.tehtud"
            @change="emit('lulita', ulesanne.id)">
        {{ ulesanne.tekst }}
        <button @click="emit('kustuta', ulesanne.id)">x</button>
    </li>
</template>

<style scoped>
    .tehtud { text-decoration: line-through; opacity: 0.5;}
    li {
    display: flex;
    align-items: center;
    gap: 0.5rem; 
    }
    li button {
        margin-left: auto;
    }
</style>