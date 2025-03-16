<template>
  <div class="h-full flex flex-col items-center overflow-hidden font-sans text-gray-800 tracking-wide">
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full mx-1"
         style="background-color: rgba(192, 0, 0, 0.75); color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <div class="h-full overflow-y-auto w-full flex flex-col items-center">
      <!-- Profile Picture -->
      <div class="mt-4 flex flex-col items-center">
        <div class="relative flex flex-col justify-center items-center">
          <img
              :src="profile_picture || defaultProfilePic"
              alt="Profile"
              class="w-32 h-32 rounded-full shadow-lg"
          />
          <h2 class="font-bold text-2xl text-gray-900 mt-2">
            {{ first_name }} {{ last_name }}
          </h2>
          <span class="text-gray-600 text-sm">
          {{ email }} | {{ phone_number }}
        </span>
        </div>
      </div>

      <!-- Profile Options -->

      <div class="shadow-lg w-5/6 mt-4 flex flex-col rounded-md border-2 border-gray-100">
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition" @click="goToProfile">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'file-invoice']" />
          <span class="text-lg font-medium">Edit profile information</span>
        </button>
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'bell']" />
          <div class="flex justify-between w-full items-center">
            <span class="text-lg font-medium">Notifications</span>
            <span class="text-blue-500 font-semibold text-right mr-3">ON</span>
          </div>
        </button>
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'language']" />
          <div class="flex justify-between w-full items-center">
            <span class="text-lg font-medium">Language</span>
            <span class="text-blue-500 font-semibold text-right mr-3">English</span>
          </div>
        </button>
      </div>

      <!-- Security & Theme -->
      <div class="shadow-lg w-5/6 mt-4 flex flex-col rounded-md border-2 border-gray-100">
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'shield-halved']" />
          <span class="text-lg font-medium">Security</span>
        </button>
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'palette']" />
          <div class="flex justify-between w-full items-center">
            <span class="text-lg font-medium">Theme</span>
            <span class="text-blue-500 font-semibold text-right mr-3">Light Mode</span>
          </div>
        </button>
      </div>

      <!-- Help & Support -->
      <div class="shadow-lg w-5/6 mt-4 mb-20 flex flex-col rounded-md border-2 border-gray-100">
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'info']" />
          <span class="text-lg font-medium">Help & Support</span>
        </button>
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'headset']" />
          <span class="text-lg font-medium">Contact Us</span>
        </button>
        <button class="p-3 flex items-center justify-start text-left w-full hover:bg-gray-100 transition">
          <font-awesome-icon class="w-6 h-6 mx-3 text-gray-600" :icon="['fas', 'lock']" />
          <span class="text-lg font-medium">Privacy Policy</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import {fetchUserProfile} from "@/utils/api";
import logo from "@/assets/New Logo.png";
import defaultProfilePic from "@/assets/avatar-default.svg";

export default {
  name: "MorePage",
  data() {
    return {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      profile_picture: "",
      logo: logo,
      defaultProfilePic: defaultProfilePic,
    };
  },
  mounted() {
    this.loadProfileData();
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile');
    },
    async loadProfileData() {
      try {
        const profileData = await fetchUserProfile();
        this.email = profileData.email
        this.first_name = profileData.first_name
        this.last_name = profileData.last_name
        this.phone_number = profileData.phone_number
        this.profile_picture = profileData.profile_picture;
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    },
  },
};
</script>
