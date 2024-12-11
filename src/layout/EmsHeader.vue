<script setup>
import PicoThemeToggle from '@/components/PicoThemeToggle.vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const logout = () => {
    //cleanup
    userStore.logout()
    // Redirect to login page

    router.replace({ path: "/login" });
}
</script>
<template>
    <header class="container">
        <nav>
            <ul>
                <li>
                    <h1>Employee Management System App</h1>
                </li>
            </ul>
            <ul>
                <li>
                    <RouterLink to="/" exact-active-class="active"> Employee List </RouterLink>
                </li>
                <li>
                    <RouterLink to="/add" exact-active-class="active"> Add Employee </RouterLink>
                </li>
                <li>
                    <RouterLink to="#" exact-active-class="active" @click="logout"> Logout </RouterLink>
                </li>
                <!-- <li>
                    <PicoThemeToggle />
                </li> -->
            </ul>
        </nav>
    </header>
</template>
<style scoped></style>
