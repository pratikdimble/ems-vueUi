<script setup>
import { ref, computed } from 'vue'
import EmsForm from './EmsForm.vue'
import { useEmsStore } from '@/stores/EmsStore';
import EmsTable from './EmsTable.vue';

const emsStore = useEmsStore();

// const empList = ref([{
//     employeeId:'',
//     name: 'niraj',
//     address: 'mumbai',
//     age: 28,
//     designation: 'software engineer',
//     department:'DU1',
//     joiningDate: '12/11/2024'
// }, {
//     employeeId:'',
//     name: 'pratik',
//     address: 'pune',
//     age: 30,
//     designation: 'sr software engineer',
//     department:'DU2',
//     joiningDate: '19/11/2024'
// }])
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
// const loading = ref(false)
// const error = ref(null)
// const validationErrors = ref({})

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
        // empList.value.push(newEmp.value);
        await emsStore.addEmployee(newEmp.value);
        resetForm()
    }

    const updateEmp = async () => {
        //  empList[i] = selected.value = 
        console.log("updating editingEmp",editingEmp)
        await emsStore.updateEmployee(newEmp.value);
        cancelEdit()
    }
    const deleteEmp = async (id) => {
        console.log("deleting id",id)
        // empList.value = empList.value.filter((t) => t !== emp)
        await emsStore.deleteEmployee(id);
        cancelEdit()
    }
    const editEmp = (id) => {
        const emp = emsStore.empList.find((t) => t.employeeId === id);
        if (emp) {
            editingEmp.value = { ...emp }; // Create a copy
        }
        // editingEmp.value = { ...emp } // Create a copy to avoid direct mutations
    }

    const cancelEdit = () => {
        editingEmp.value = null
        emsStore.validationErrors = {}
    }

    fetchEmps()

    // function addEmployee() {
    //     empList.value.push(newEmp.value);
    //     // todos.value.push({ user: newEmp.user, task: newEmp.task, targetDate: newEmp.targetDate })
    //     // newEmp.value = ''
    //     resetForm()
    // }

    // function editEmp(emp) {
    //     // editingEmp.value = emp
    //     editingEmp.value = { ...emp } // Create a copy to avoid direct mutations
    // }
    // function updateEmp() {
    //     editingEmp.value='';
    // }
    // function deleteEmp(emp) {
    //     empList.value = empList.value.filter((t) => t !== emp)
    // }
    
</script>
<template>
    <section id="emsform">
        <h2>Employee Management System</h2>
        <div v-if="emsStore.error" class="errormessage">{{ emsStore.error }}</div>
        <EmsForm v-if="!editingEmp" v-model:loading="loading" v-model:emp="newEmp" v-model:validationErrors="emsStore.validationErrors" form-label="Add: Employee" submit-label="Add Employee" reset-label="Reset" @submit="addEmployee" @reset="resetForm"/>
        <EmsForm v-else v-model:loading="loading"  v-model:emp="editingEmp" v-model:validationErrors="emsStore.validationErrors"  form-label="Edit: Employee" submit-label="Update Employee" reset-label="Cancel" @submit="updateEmp" @reset="cancelEdit"/>
    
        <!-- <form v-if="!editingEmp" @submit.prevent="addEmployee">
            <fieldset>
                <legend>Add: Employee</legend>
                <InputWithError inputId="Name" label="Name" v-model:task="newEmp.name" v-model:error="validationErrors.name" placeholder="Name" />
                <InputWithError inputId="Address" label="Address" v-model:task="newEmp.address" v-model:error="validationErrors.address" placeholder="Address (10-200 chars)" type="textarea" />
                <InputWithError inputId="Age" label="Age" v-model:task="newEmp.age" v-model:error="validationErrors.age" placeholder="Age" />
                <InputWithError inputId="Designation" label="Designation" v-model:task="newEmp.designation" v-model:error="validationErrors.designation" placeholder="Designation" />
                <InputWithError inputId="Department" label="Department" v-model:task="newEmp.department" v-model:error="validationErrors.department" placeholder="Department" />
                <InputWithError inputId="JoiningDate" label="JoiningDate" v-model:task="newEmp.joiningDate" v-model:error="validationErrors.joiningDate" type="date" :max="today" />
            </fieldset>
            <fieldset class="grid">
                <button type="submit" class="outline" :aria-busy="loading" :disabled="loading">Add Employee</button>
                <button type="button" @click="resetForm">Reset</button>
            </fieldset>
        </form>
        <form v-else @submit.prevent="updateEmp">
            <fieldset>
                <legend>Edit: Employee</legend>
                <InputWithError inputId="Name" label="Name" v-model:task="editingEmp.name" v-model:error="validationErrors.name" placeholder="Name" />
                <InputWithError inputId="Address" label="Address" v-model:task="editingEmp.address" v-model:error="validationErrors.address" placeholder="Address (10-200 chars)" type="textarea" />
                <InputWithError inputId="Age" label="Age" v-model:task="editingEmp.age" v-model:error="validationErrors.age" placeholder="Age" />
                <InputWithError inputId="Designation" label="Designation" v-model:task="editingEmp.designation" v-model:error="validationErrors.designation" placeholder="Designation" />
                <InputWithError inputId="Department" label="Department" v-model:task="editingEmp.department" v-model:error="validationErrors.department" placeholder="Department" />
                <InputWithError inputId="JoiningDate" label="JoiningDate" v-model:task="editingEmp.joiningDate" v-model:error="validationErrors.joiningDate" type="date" :max="today" />
           </fieldset>
            <fieldset class="grid">
                <button type="submit" :aria-busy="loading" :disabled="loading">Update Employee</button>
                <button type="button" @click="cancelEdit">Cancel</button>
            </fieldset>
        </form> -->
    </section>
    <section id="emptable">
        <h2>Employee List</h2>
        <div>
            <EmsTable :loading="emsStore.loading" :empList="emsStore.empList" @edit-click="editEmp" @remove-click="deleteEmp" />
            <!-- <table v-if="empList.length">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Joining Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="emp in empList" :key="emp.id">
                        <td>{{ emp.name }} </td>
                        <td>{{ emp.address }}</td>
                        <td>{{ emp.joiningDate }}</td>
                        <td><button @click="editEmp(emp)">Edit</button></td>
                        <td><button @click="deleteEmp(emp,emp.id)">Delete</button></td>
                    </tr>
                </tbody>
            </table> -->
        </div>
    </section>
</template>
<style scoped>
.errormessage {
    color: red;
}
</style>
