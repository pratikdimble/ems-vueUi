<template>
    <table v-if="empList && empList.length">
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Age</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="emp in empList" :key="emp.employeeId">
                <td>{{ emp.name }} </td>
                <td>{{ emp.address }}</td>
                <td>{{ emp.age }}</td>
                <td>{{ emp.department }}</td>
                <td>{{ emp.designation }}</td>
                <td>{{ emp.joiningDate }}</td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => editHandler(emp.employeeId)">Edit</button></td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => deleteHandler(emp.employeeId)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
const props = defineProps([
    "empList",
    "loading"
]);

const emit = defineEmits(['editClick', 'removeClick'])

const editHandler = (id) => {
    emit('editClick', id);
}
const deleteHandler = (id) => {
    emit('removeClick', id);
}
</script>
<style scoped></style>