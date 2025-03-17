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

    <!-- Sign-Up Form Container -->
    <div class="flex flex-col flex-grow w-full max-w-md p-8 bg-white">
      <!-- Sign-Up Form -->
      <form @submit.prevent="handleSignup" class="space-y-3">
        <!-- Email Field -->
        <div class="flex flex-col">
          <label for="email" class="text-sm font-semibold text-gray-700">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

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

        <!-- Confirm Password Field -->
        <div class="flex flex-col">
          <label for="confirm-password" class="text-sm font-semibold text-gray-700">Confirm Password</label>
          <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- Sign-Up Button -->
        <button
            type="submit"
            class="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all font-bold"
        >
          Sign Up
        </button>
      </form>

      <!-- Privacy & Terms -->
      <p class="text-sm text-gray-500 mt-4 text-center">
        By signing up, you agree to our
        <button @click="showPrivacyPolicy" class="text-red-600 underline">Privacy Policy</button>
        and
        <button @click="showTermsAndConditions" class="text-red-600 underline">Terms and Conditions</button>.
      </p>
      <!-- Already Have an Account? Login -->
      <div class="text-center mt-4">
        <p class="text-gray-600 text-sm">
          Already have an account?
          <router-link to="/login" class="text-red-600 underline">
            Login
          </router-link>
        </p>
      </div>
    </div>

    <!-- Privacy Policy Popup -->
    <transition name="fade">
      <div v-if="showPrivacyPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
          <h3 class="text-xl font-bold mb-4">Privacy Policy</h3>
          <p class="text-sm text-gray-600 mb-4">
            Your privacy is important to us. This is where you can describe the details of your privacy policy.
          </p>
          <button @click="closePopups" class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">Close</button>
        </div>
      </div>
    </transition>

    <!-- Terms and Conditions Popup -->
    <transition name="fade">
      <div v-if="showTermsPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
          <h3 class="text-xl font-bold mb-4">Terms and Conditions</h3>
          <p class="text-sm text-gray-600 mb-4">
            Please read our terms and conditions carefully. This is where you can provide detailed terms of service.
          </p>
          <button @click="closePopups" class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">Close</button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import axios from "axios";
import logo from "@/assets/New Logo.png";

export default {
  name: "SignupPage",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      showPrivacyPopup: false,
      showTermsPopup: false,
      logo: logo,
    };
  },
  methods: {
    async handleSignup() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      try {
        const VUE_APP_API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
        const response = await axios.post(`${VUE_APP_API_BASE_URL}/api/user/register/`, {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);

        this.$router.push("/login");
      } catch (err) {
        alert("Registration failed! " + (err.response?.data?.detail || ""));
      }
    },
    showPrivacyPolicy() {
      this.showPrivacyPopup = true;
    },
    showTermsAndConditions() {
      this.showTermsPopup = true;
    },
    closePopups() {
      this.showPrivacyPopup = false;
      this.showTermsPopup = false;
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

/* Fade Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
