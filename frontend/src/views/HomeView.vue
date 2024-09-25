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

        // After login, extract access token from URL query parameters
        const accessToken = new URLSearchParams(window.location.search).get("access_token");

        if (accessToken) {
          // Store the access token (localStorage, Vuex, Pinia, or cookies)
          localStorage.setItem('token', accessToken);
          console.log(accessToken)
          // Redirect the user to the home page or desired page
          router.push('/home');
        }

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