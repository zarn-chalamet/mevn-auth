<template>
    <div>
        <h2>SignUp</h2>
        <form @submit.prevent="signUp">
        <input type="text" placeholder="username" v-model="displayName">
        <input type="email" placeholder="email" v-model="email">
        <input type="text" placeholder="first name">
        <input type="text" placeholder="last name">
        <input type="password" placeholder="password" v-model="password">
        <input type="password" placeholder="confirm password">
        <p v-if="error">{{ error }}</p>
        <button>
            Sign up
        </button>
        </form>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>