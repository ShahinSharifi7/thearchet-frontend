<template>
  <div class="flex flex-col items-center h-full bg-gray-100">

    <!-- Header (Same as Home Page, without Profile Button) -->
    <div class="relative w-full h-[25vh] flex flex-col justify-center items-center text-white">
      <!-- Pink Background Layer (Curved Border) -->
      <div class="absolute top-0 left-0 w-full h-full bg-[#B7372B]"
           style="clip-path: ellipse(115% 85% at center top); opacity: 30%"></div>

      <!-- Red Foreground Layer -->
      <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#C00000]"
           style="clip-path: ellipse(110% 80% at center top);">
        <!-- Logo -->
        <img :src="logo" alt="Logo" class="h-[35%] w-auto"/>
        <!-- App Name -->
        <span class="text-[3vh] modak mt-2">Archet</span>
      </div>
    </div>

    <!-- Login Form Container -->
    <div class="flex flex-col flex-grow w-full max-w-md p-8 bg-white">
      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5 w-full">
        <!-- Username Field -->
        <div class="flex flex-col">
          <label for="username" class="text-sm font-semibold text-gray-700">Username</label>
          <input
              type="text"
              id="username"
              v-model="username"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- Password Field -->
        <div class="flex flex-col">
          <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- Login Button -->
        <button
            type="submit"
            class="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all font-bold"
        >
          Login
        </button>
      </form>

      <!-- Forgot Password Link -->
      <div class="text-center mt-4">
        <router-link to="/forgot-password" class="text-red-600 underline text-sm">
          Forgot Password?
        </router-link>
      </div>

      <!-- Don't Have an Account? Sign Up -->
      <div class="text-center mt-4">
        <p class="text-gray-600 text-sm">
          Don't have an account?
          <router-link to="/signup" class="text-red-600 underline">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import logo from "@/assets/New Logo.png";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      logo: logo,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const VUE_APP_API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
        const response = await axios.post(`${VUE_APP_API_BASE_URL}/api/user/login/`, {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        this.$router.push("/");
      } catch (error) {
        alert("Invalid credentials. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
