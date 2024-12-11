<script setup>
import { ref } from 'vue'
import { useEmsStore } from '../stores/EmsStore'
import { useRouter } from 'vue-router'
import EmsForm from '../components/EmsForm.vue'

const emsStore = useEmsStore()
const router = useRouter()

const newEmp = ref({
    employeeId:'',
    name: '',
    address: '',
    age: 0,
    designation: '',
    department:'',
    joiningDate: '',
    title:'',
    task:''
})

const addEmployee = async () => {
    await emsStore.addEmployee(newEmp.value)
    if (!emsStore.hasError) {
        router.push('/')
    }
}

const resetForm = () => {
    newEmp.value = {
        employeeId:'',
        name: '',
        address: '',
        age: 0,
        designation: '',
        department:'',
        joiningDate: '',
        title:'',
        task:''
    }
    emsStore.clearErrors()
}
</script>
<template>
    <section id="emp-add">
        <h2>Add New Employee</h2>
        <div v-if="emsStore.error" class="error-message"> {{ emsStore.error }} </div>
        <EmsForm :loading="emsStore.loading" v-model:emp="newEmp" v-model:validationErrors="emsStore.validationErrors" form-label="Add: Employee" submit-label="Add Employee" reset-label="Reset" @submit="addEmployee" @reset="resetForm" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
