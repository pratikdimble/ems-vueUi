<template>
    
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