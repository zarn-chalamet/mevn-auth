<template>
    <div>
        <h2>Log In</h2>
        <form @submit.prevent="loginFun">
            <input type="email" placeholder="email" v-model="email">
            <input type="password" placeholder="password" v-model="password">
            <p v-if="err">{{ err }}</p>
            <button @click="login">
                Login
            </button>
            <button @click="loginWithGoogle">Login with google</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
   setup(){
    const router = useRouter();
    let email = ref(null);
    let password = ref(null);
    let err = ref(null);

    let login = async () => {
        const authStore = useAuthStore();

        try{
            await authStore.login({
                email: email.value,
                password: password.value
            });
            router.push('/home');
        }catch(error){
            err.value = error;
        }
    }

    let loginWithGoogle = () => {
        window.location.href = 'http://localhost:3500/api/auth/google';
    }

    return {email,password,login,err,loginWithGoogle}
   }
}
</script>

<style>

</style>