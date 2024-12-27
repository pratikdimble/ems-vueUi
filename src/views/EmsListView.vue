<script setup>
import { onMounted, ref } from 'vue'
import { useEmsStore } from '../stores/EmsStore';
import EmsTable from '../components/EmsTable.vue'
import { useRouter } from 'vue-router'
import EmsCards from '@/components/EmsCards.vue';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '../stores/userStore';

const emsStore = useEmsStore()
const router = useRouter()
const userStore = useUserStore()

const showCard = useStorage('emp-view-preference', 'table');
const ordering = useStorage('emp-sort-preference', 'asc');
const selectedDept = ref({
    value:""
});
selectedDept.value="00"
const editEmp = (employeeId) => {
    router.push({ name: 'EmployeeEdit', params: { employeeId } })
}

const deleteEmp = async (id) => {
    await emsStore.deleteEmployee(id)
    if(userStore.isAuthenticated)
        await emsStore.fetchEmpsByUser(localStorage.getItem("username"))
    else
        await emsStore.fetchEmps()
}

const handleSelection = async() => {
    console.log(ordering.value)
    if(ordering.value =="asc")
        await emsStore.sortEmployeeByJoiningDate(0)
    else
        await emsStore.sortEmployeeByJoiningDate(1)
}
const handleSelectionDept = async() => {
    console.log(selectedDept.value)
    await emsStore.getEmployeeByDepartment(selectedDept.value)

}

onMounted(async () => {
    if(userStore.isAuthenticated)
        await emsStore.fetchEmpsByUser(localStorage.getItem("username"))
    else
        await emsStore.fetchEmps()
})

</script>
<template>
    <section id="emp-list" class="list-employee-container">
        <h2>Employee List</h2>
        <small>
            <p>
                <select v-model="selectedDept" @change="handleSelectionDept" class="dropdown-container">
                    <option disabled value="00" selected>Please select a department</option>
                    <option value="DU1">DU1</option>
                    <option value="DU2">DU2</option>
                    <option value="Other">Other</option>
                    <!-- <option v-for="fruit in fruits" :key="fruit" :value="fruit">
                        {{ fruit }}
                    </option> -->
                </select>
            </p>
        </small>
        
        <small>
            <p>
                <label>view as:<input type="radio" v-model="showCard" value="card" />cards<input type="radio" v-model="showCard" value="table" />table
                <label>Sort By Date:
                    <input type="radio" v-model="ordering" value="asc" @change="handleSelection" />Ascending
                    <input type="radio" v-model="ordering" value="desc" @change="handleSelection" />Descending
                </label>
                </label>
            </p>
        </small>
        <div v-if="emsStore.error" class="errormessage">{{ emsStore.error }}</div>
        <EmsCards v-if="showCard === 'card'" :loading="emsStore.loading" :empList="emsStore.empList" @edit-click="editEmp" @remove-click="deleteEmp" />
        <EmsTable v-if="showCard === 'table'" :loading="emsStore.loading" :empList="emsStore.empList" @edit-click="editEmp" @remove-click="deleteEmp" />
    </section>
</template>
<style scoped>
.list-employee-container {

    margin-top: 50px;

}
.dropdown-container {
  font-family: Arial, sans-serif;
  max-width: 450px;
  margin: 10px auto;
  padding: 5px;
  background-color: #f7f7f7;
  border-radius: 8px;
}
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
