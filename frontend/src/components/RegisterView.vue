<template>
    <div>
        <h2>SignUp</h2>
        <form @submit.prevent="signUp">
        <input type="text" placeholder="username" v-model="username">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <input type="password" placeholder="confirm password" v-model="confirm_password">
        <p v-if="err">{{ err }}</p>
        <button @click="signup">
            Sign up
        </button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(){
        let username = ref(null);
        let email = ref(null);
        let password = ref(null);
        let confirm_password = ref(null);
        const router = useRouter();
        let err = ref(null);

        let signup = async () => {
            const authStore = useAuthStore();
            console.log(email.value);
            console.log(username.value);
            console.log(password.value);
            console.log(confirm_password.value);
            try {
                await authStore.register({
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    password_confirm: confirm_password.value
                })
                router.push("/");
            } catch (error) {
                err.value = error;
            }
        }
        return {username,email,password,confirm_password,signup,err}
    }
}
</script>

<style>

</style>