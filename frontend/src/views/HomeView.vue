<template>
  <div v-if="user">
    <h3>Home</h3>
    <h4>Username: {{ user.username }}</h4>
    <h4>Full name: {{ user.first_name }} {{ user.last_name }}</h4>
    <h4>email: {{ user.email }}</h4>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
 setup(){
    const authStore = useAuthStore();
    const router = useRouter();
    let user = ref(null);

    onMounted( async () => {
        await authStore.getUser();
        user.value = authStore.userDetail;
    })

    let logout = async () => {
        await authStore.logout();
        router.push('/');
    }
    return {user, logout};
 }
}
</script>

<style>

</style>