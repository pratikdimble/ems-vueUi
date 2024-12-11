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

onMounted(async () => {
    if(userStore.isAuthenticated)
        await emsStore.fetchEmpsByUser(localStorage.getItem("username"))
    else
        await emsStore.fetchEmps()
})

</script>
<template>
    <section id="emp-list">
        <h2>Employee List</h2>
        <small>
            <p>
                <label>view as:<input type="radio" v-model="showCard" value="card" />cards<input type="radio" v-model="showCard" value="table" />table</label>
            </p>
        </small>
        <div v-if="emsStore.error" class="errormessage">{{ emsStore.error }}</div>
        <EmsCards v-if="showCard === 'card'" :loading="emsStore.loading" :empList="emsStore.empList" @edit-click="editEmp" @remove-click="deleteEmp" />
        <EmsTable v-if="showCard === 'table'" :loading="emsStore.loading" :empList="emsStore.empList" @edit-click="editEmp" @remove-click="deleteEmp" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
