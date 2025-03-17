<template>
  <div class="h-full flex flex-col items-center overflow-hidden font-sans text-gray-800 tracking-wide">

    <!-- Loading Spinner with Ad Box -->
    <div v-if="loading" class="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 z-50">
      <div class="loader-container flex flex-col items-center">
        <div class="loader"></div>
        <p class="text-gray-600 mt-3 font-semibold">Loading...</p>

        <!-- Ad Box -->
        <div v-if="!isPremium" class="w-80 h-24 border-2 border-gray-300 flex items-center justify-center rounded-lg shadow-md bg-gray-100 mt-4">
          <span class="text-gray-500 font-bold text-lg">Your ads here!</span>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full mx-1"
         style="background-color: rgb(208, 64, 64); color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <div v-if="!loading" class="h-full overflow-y-auto w-full flex flex-col items-center bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">
      <!-- Premium Status -->
      <div class="mt-6 text-center">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ isPremium ? "You are a Premium Member!" : "Unlock Premium Benefits" }}
        </h2>
        <p class="text-gray-600 text-lg">
          {{ isPremium ? "Enjoy your exclusive perks!" : "Enjoy exclusive perks and elevate your experience!" }}
        </p>
      </div>

      <!-- Premium Features -->
      <div class="w-5/6 mt-4 shadow-lg flex flex-col rounded-md border-2 border-gray-100 bg-white">
        <div class="p-4 flex items-center">
          <font-awesome-icon class="w-6 h-6 mx-3 text-red-600" :icon="['fas', 'ad']" />
          <span class="text-lg font-medium">No Ads!</span>
        </div>
        <div class="p-4 flex items-center">
          <font-awesome-icon class="w-6 h-6 mx-3 text-red-600" :icon="['fas', 'users']" />
          <span class="text-lg font-medium">You can see your top 3 matches!</span>
        </div>
        <div class="p-4 flex items-center">
          <font-awesome-icon class="w-6 h-6 mx-3 text-red-600" :icon="['fas', 'ticket']" />
          <span class="text-lg font-medium">1 free ticket to Workshops & Events</span>
        </div>
        <div class="p-4 flex items-center">
          <font-awesome-icon class="w-6 h-6 mx-3 text-red-600" :icon="['fas', 'music']" />
          <span class="text-lg font-medium">Presale concert access</span>
        </div>
        <div class="p-4 flex items-center">
          <font-awesome-icon class="w-6 h-6 mx-3 text-red-600" :icon="['fas', 'comments']" />
          <span class="text-lg font-medium">Consulting with a specialist</span>
        </div>
      </div>

      <!-- Upgrade/Downgrade Buttons -->
      <div class="mt-6 flex flex-col items-center w-5/6">
        <button v-if="!isPremium"
                @click="upgradeToPremium"
                class="w-full p-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
          Upgrade to Premium
        </button>
        <button v-else
                @click="removePremium"
                class="w-full p-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition">
          Remove Premium
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserProfile, upgradePremium, removePremium } from "@/utils/api";
import logo from "@/assets/New Logo.png";

export default {
  name: "PremiumPage",
  data() {
    return {
      isPremium: localStorage.getItem("is_premium") === "true" || false, // Default to false if missing
      loading: true, // Ensures main content is hidden initially
      logo: logo,
    };
  },
  async mounted() {
    // If the user is not premium, show a delay before fetching data
    if (!this.isPremium) {
      setTimeout(async () => {
        await this.loadProfileData();
        this.loading = false; // Only show content after loading finishes
      }, 2500);
    } else {
      // Premium users should only see loading if the request is running
      await this.loadProfileData();
      this.loading = false;
    }
  },
  methods: {
    async loadProfileData() {
      try {
        const profileData = await fetchUserProfile();
        this.isPremium = profileData.is_premium;
        localStorage.setItem("is_premium", profileData.is_premium ? "true" : "false"); // Ensure proper storage format
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    },
    async upgradeToPremium() {
      try {
        await upgradePremium();
        this.isPremium = true;
        localStorage.setItem("is_premium", "true"); // Store new premium status
      } catch (error) {
        console.error("Failed to upgrade:", error);
      }
    },
    async removePremium() {
      try {
        await removePremium();
        this.isPremium = false;
        localStorage.setItem("is_premium", "false"); // Store updated status
      } catch (error) {
        console.error("Failed to remove premium:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Loading Spinner */
.loader {
  width: 40px;
  height: 40px;
  border: 5px solid #e2e2e2;
  border-top: 5px solid #d04040;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Center Loader */
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>