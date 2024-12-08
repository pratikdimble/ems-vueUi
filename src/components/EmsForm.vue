<template>
    <form @submit.prevent="submitHandler">
        <fieldset>
            <legend>{{ formLabel }}</legend>
                <InputWithError inputId="Name" label="Name" v-model:task="emp.name" v-model:error="validationErrors.name" placeholder="Name" />
                <InputWithError inputId="Address" label="Address" v-model:task="emp.address" v-model:error="validationErrors.address" placeholder="Address (10-200 chars)" type="textarea" />
                <InputWithError inputId="Age" label="Age" v-model:task="emp.age" v-model:error="validationErrors.age" placeholder="Age" />
                <InputWithError inputId="Designation" label="Designation" v-model:task="emp.designation" v-model:error="validationErrors.designation" placeholder="Designation" />
                <InputWithError inputId="Department" label="Department" v-model:task="emp.department" v-model:error="validationErrors.department" placeholder="Department" />
                <InputWithError inputId="JoiningDate" label="JoiningDate" v-model:task="emp.joiningDate" v-model:error="validationErrors.joiningDate" type="date" :min="today" />
            </fieldset>
        <fieldset class="grid">
            <button type="submit" class="outline" :aria-busy="loading" :disabled="loading">{{submitLabel}}</button>
            <button type="button" class="secondary"  :aria-busy="loading" :disabled="loading" @click="resetHandler">{{resetLabel}}</button>
        </fieldset>
    </form>
</template>

<script setup>
import InputWithError from './InputWithError.vue';
import { computed } from 'vue'

const emp = defineModel('emp')
const validationErrors = defineModel('validationErrors')
// const loading = defineModel('loading')
const props = defineProps([
  "loading",
"formLabel",
"submitLabel",
"resetLabel",
]);
const emit = defineEmits(['submit', 'reset'])

const today = computed(() => new Date().toISOString().split('T')[0])


const submitHandler = () => {
  emit('submit');
}
const resetHandler = () => {
  emit('reset');
}

</script>

<style scoped>

</style>