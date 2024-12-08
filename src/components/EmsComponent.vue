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
const selected = ref(null)
const orderSelected  = ref(null)
const pick= ref({value:0})
const isShow= ref(true)

const clearValues= ()=>{
    pick.value = 0,
    isShow.value = true,
    orderSelected.value = null
    selected.value = null
}

const fetchEmps = async () => {
    clearValues()
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

    const radioClick = async(flag)=>{
        if(flag){
            console.log("Search calling")
            isShow.value = true
        }
            
        else{
            console.log("Sort calling")
            isShow.value = false
        }
    }

    const searchByDept = async()=>{
        console.log(selected.value)
        if(selected.value != undefined && selected.value != null)
            await emsStore.getEmployeeByDepartment(selected.value) 
    }

    const sortEmployeeByJoiningDate = async()=>{
        console.log(orderSelected.value)
        if(orderSelected.value != undefined && orderSelected.value != null)
            await emsStore.sortEmployeeByJoiningDate(orderSelected.value) 
    }

    fetchEmps()    
</script>
<template>
    <section id="emsform">
        <h2>Employee Management System</h2>
        <div v-if="emsStore.error" class="errormessage">{{ emsStore.error }}</div>
        <EmsForm v-if="!editingEmp" v-model:loading="emsStore.loading" v-model:emp="newEmp" v-model:validationErrors="emsStore.validationErrors" form-label="Add: Employee" submit-label="Add Employee" reset-label="Reset" @submit="addEmployee" @reset="resetForm"/>
        <EmsForm v-else v-model:loading="emsStore.loading"  v-model:emp="editingEmp" v-model:validationErrors="emsStore.validationErrors"  form-label="Edit: Employee" submit-label="Update Employee" reset-label="Cancel" @submit="updateEmp" @reset="cancelEdit"/>
    </section>
    <section  id="showhide">
        <h2>Search and Sort</h2>
        <fieldset class="grid">
            <label>Search By Department</label><input type="radio" v-model="pick" :value="0" @click="radioClick(true)"/>
            <label>Sort By Joining Date</label><input type="radio" v-model="pick" :value="1" @click="radioClick(false)" />
        </fieldset>
    </section>
    <section v-if="isShow" id="seachEmp">
        <h2>Search Employee By Department</h2>
        <div>
            <fieldset class="grid">
                <label style="align-content: center;">Select Department</label>
                <select  label="Name" name="searchdept" id="searchdept" v-model="selected">
                    <option disabled value="">Please select one</option>
                    <option value="DU1">DU1</option>
                    <option value="DU2">DU2</option>
                </select>
                <button type="submit" class="outline" :aria-busy="emsStore.loading" @click="searchByDept">Search</button>
                <button type="submit" class="outline" :aria-busy="emsStore.loading" @click="fetchEmps">Clear</button>
            </fieldset>
            <!-- <InputWithError inputId="Name" label="Name" v-model:task="emp.name" v-model:error="validationErrors.name" placeholder="Name" /> -->
            <!-- Search <input name="query" v-model="searchQuery">  -->
        </div>
    </section>
    <section v-if="!isShow" id="sortEmp">
        <h2>Sort Employee By Joining Date</h2>
        <div>
            <fieldset class="grid">
                <label style="align-content: center;">Select Sort Order</label>
                <select  label="Name" name="sortByDate" id="sortByDate" v-model="orderSelected">
                    <option disabled value="">Please select one</option>
                    <option value="0">Ascending</option>
                    <option value="1">Descending</option>
                </select>
                <button type="submit" class="outline" :aria-busy="emsStore.loading" @click="sortEmployeeByJoiningDate">Search</button>
                <button type="submit" class="outline" :aria-busy="emsStore.loading" @click="fetchEmps">Clear</button>
            </fieldset>
        </div>
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
