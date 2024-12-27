<!-- <script setup>
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
</style> -->
<script setup>
import { ref } from 'vue'
import { useEmsStore } from '../stores/EmsStore'
import { useRouter } from 'vue-router'
import EmsForm from '../components/EmsForm.vue'

const emsStore = useEmsStore()
const router = useRouter()

const newEmp = ref({
    employeeId: '',
    name: '',
    address: '',
    age: 0,
    designation: '',
    department: '',
    joiningDate: '',
    title: '',
    task: ''
})

const addEmployee = async () => {
    await emsStore.addEmployee(newEmp.value)
    if (!emsStore.hasError) {
        router.push('/')
    }
}

const resetForm = () => {
    newEmp.value = {
        employeeId: '',
        name: '',
        address: '',
        age: 0,
        designation: '',
        department: '',
        joiningDate: '',
        title: '',
        task: ''
    }
    emsStore.clearErrors()
}
</script>

<template>
    <section id="emp-add" class="add-employee-container">
        <h2>Add New Employee</h2>
        <div v-if="emsStore.error" class="error-message"> {{ emsStore.error }} </div>
        <EmsForm
            :loading="emsStore.loading"
            v-model:emp="newEmp"
            v-model:validationErrors="emsStore.validationErrors"
            form-label="Add: Employee"
            submit-label="Add Employee"
            reset-label="Reset"
            @submit="addEmployee"
            @reset="resetForm"
        />
    </section>
</template>

<style scoped>
.add-employee-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
}

h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.error-message {
    color: red;
    margin-bottom: 15px;
}

@media (max-width: 768px) {
    .add-employee-container {
        padding: 15px;
        width: 100%;
        margin: 10px;
    }
}
</style>
