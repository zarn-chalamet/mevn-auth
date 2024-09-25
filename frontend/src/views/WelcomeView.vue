<template>
    <div class="welcome container">
          <div v-if="showLogin">
            <Login></Login>
            <p>Don't have an account? <span @click= "showLogin = !showLogin">Register Here</span></p>
          </div>
          <div v-else>
            <Register></Register>
            <p>Already have an account? <span @click= "showLogin = !showLogin">Login here</span></p>
          </div>
      </div>
  </template>
  
  <script>
  import Register from '../components/RegisterView.vue'
  import Login from '../components/LoginView.vue'
  import { ref } from 'vue';
  export default {
    components: {
    Register,
    Login },
    setup(){
      let showLogin = ref(true);

      return {showLogin}
    }
  }
  </script>
  
  <style>
    .welcome {
      text-align: center;
      padding: 20px 0;
      background-color: white;
      width: 90%;
      max-width: 900px;
      border-radius: 10px;
      margin: 80px auto;
  
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    /* form styles */
    .welcome form {
      width: 300px;
      margin: 20px auto;
  
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    /* .welcome label {
      display: block;
      margin: 20px 0 10px;
    } */
    .welcome input {
      width: 70%;
      padding: 10px;
      border-radius: 20px;
      border: 1px solid #eee;
      outline: none;
      color: #999;
      margin: 10px auto;
    }
    .welcome span{
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
    }
    p{
      font-size: small;
    }
  </style>