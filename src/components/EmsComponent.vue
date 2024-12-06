<script setup>
import { ref, computed } from 'vue'
import EmsForm from './EmsForm.vue'
import { useEmsStore } from '@/stores/EmsStore';
import EmsTable from './EmsTable.vue';

const emsStore = useEmsStore();

const newEmp = ref({
    employeeId:'',
    name: '',
    address: '',
    age: 0,
    designation: '',
    department:'',
    joiningDate: ''
})
const editingEmp = ref(null)
const fetchEmps = async () => {
    await emsStore.fetchEmps()
}
    const resetForm = () => {
        newEmp.value = {
            employeeId:'',
            name: '',
            address: '',
            age: 0,
            designation: '',
            department:'',
            joiningDate: ''
        }
        emsStore.validationErrors = {}
    }

    const addEmployee = async () => {
        console.log("Adding newEmp",newEmp)
        await emsStore.addEmployee(newEmp.value);
        resetForm()
        fetchEmps()
    }

    const updateEmp = async () => {
        console.log("updating editingEmp",editingEmp)
        await emsStore.updateEmployee(editingEmp.value);
        cancelEdit()
        fetchEmps()
    }
    const deleteEmp = async (id) => {
        console.log("deleting id",id)
        await emsStore.deleteEmployee(id);
        cancelEdit()
        fetchEmps()
    }
    const editEmp = (id) => {
        const emp = emsStore.empList.find((t) => t.employeeId === id);
        if (emp) {
            editingEmp.value = { ...emp }; // Create a copy
        }
    }

    const cancelEdit = () => {
        editingEmp.value = null
        emsStore.validationErrors = {}
        resetForm()
    }

    fetchEmps()    
</script>
<template>
    <section id="emsform">
        <h2>Employee Management System</h2>
        <div v-if="emsStore.error" class="errormessage">{{ emsStore.error }}</div>
        <EmsForm v-if="!editingEmp" v-model:loading="loading" v-model:emp="newEmp" v-model:validationErrors="emsStore.validationErrors" form-label="Add: Employee" submit-label="Add Employee" reset-label="Reset" @submit="addEmployee" @reset="resetForm"/>
        <EmsForm v-else v-model:loading="loading"  v-model:emp="editingEmp" v-model:validationErrors="emsStore.validationErrors"  form-label="Edit: Employee" submit-label="Update Employee" reset-label="Cancel" @submit="updateEmp" @reset="cancelEdit"/>
    </section>
    <section id="emptable">
        <h2>Employee List</h2>
        <div>
            <EmsTable :loading="emsStore.loading" :empList="emsStore.empList" @edit-click="editEmp" @remove-click="deleteEmp" />
        </div>
    </section>
</template>
<style scoped>
.errormessage {
    color: red;
}
</style>
