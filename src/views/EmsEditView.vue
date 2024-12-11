<script setup>
import { ref, onMounted } from 'vue'
import { useEmsStore } from '../stores/EmsStore'
import { useRouter } from 'vue-router'
import EmsForm from '../components/EmsForm.vue'

const props = defineProps({
    employeeId: {
        type: String,
        required: true
    }
})

const emsStore = useEmsStore()
const router = useRouter()

const editingEmp = ref(null)

const updateEmp = async () => {
    await emsStore.updateEmployee(editingEmp.value)
    if (!emsStore.hasError) {
        router.push('/')
    }
}

const cancelEdit = () => {
    router.push('/')
    emsStore.clearErrors()
}

onMounted(async () => {
    console.log(props.employeeId);
    const emp = emsStore.empList.find((t) => t.employeeId === props.employeeId);
    if (emp) {
        editingEmp.value = { ...emp }
    } else {
        router.push('/')
    }
})
</script>
<template>
    <section id="emp-edit">
        <h2>Edit Employee Task</h2>
        <div v-if="emsStore.error" class="error-message"> {{ emsStore.error }} </div>
        <EmsForm v-if="editingEmp" :loading="emsStore.loading" v-model:emp="editingEmp" v-model:validationErrors="emsStore.validationErrors" form-label="Edit: Employee" submit-label="Update Employee" reset-label="Cancel" @submit="updateEmp" @reset="cancelEdit" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
