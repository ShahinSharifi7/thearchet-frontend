<template>
  <div class="master-layout h-screen w-screen h-screen flex flex-col">
    <!-- Header -->
    <header class="header w-full flex justify-between items-center p-4 bg-red-600 text-white shadow-md">
      <button class="logo text-2xl font-bold text-center" @click="navigate('')">
        <img :src="logo" alt="Logo" class="h-12 w-auto mr-2" />
      </button>
      <button class="menu-button flex flex-col gap-1" @click="toggleSidebar">
        <span class="block w-6 h-1 bg-white rounded"></span>
        <span class="block w-6 h-1 bg-white rounded"></span>
        <span class="block w-6 h-1 bg-white rounded"></span>
      </button>
    </header>

    <!-- Sidebar -->
    <transition name="slide">
      <aside v-if="showSidebar" class="sidebar fixed top-0 right-0 w-48 h-full bg-black text-white p-4 flex flex-col gap-4 overflow-y-auto">
        <button class="self-end text-right text-xl font-bold mb-4" @click="toggleSidebar">&times;</button>
        <button class="text-left p-2 rounded hover:bg-red-500" @click="navigate('profile')">
          <font-awesome-icon icon="user" /> Profile
        </button>
        <button class="text-left p-2 rounded hover:bg-red-500" @click="navigate('')">
          <font-awesome-icon :icon="['fas', 'user-group']" /> My Networks
        </button>
        <button class="text-left p-2 rounded hover:bg-red-500" @click="navigate('messages')">
          <font-awesome-icon icon="message" /> Messages
        </button>
        <button class="text-left p-2 rounded hover:bg-red-500" @click="navigate('notifications')">
          <font-awesome-icon :icon="['fas', 'envelope']" /> Notifications
        </button>
        <button class="text-left text-yellow-300 p-2 rounded hover:bg-red-500" @click="navigate('')">
          <font-awesome-icon :icon="['fas', 'bolt']" /> Premium
        </button>
        <button class="text-left p-2 rounded hover:bg-red-500" @click="navigate('settings')">
          <font-awesome-icon icon="cog" /> Settings
        </button>
        <button class="text-left p-2 rounded hover:bg-red-500" @click="navigate('contact-us')">
          <font-awesome-icon :icon="['fas', 'phone']" /> Contact Us
        </button>
        <button class="text-left p-2 rounded hover:bg-red-500" @click="logout">
          <font-awesome-icon icon="sign-out-alt" /> Logout
        </button>
        <div class="flex justify-around items-center py-4 mt-auto border-t border-gray-700">
          <!-- Telegram Button -->
          <a
              href="https://t.me/your_telegram_link"
              target="_blank"
              class="w-8 h-8 flex justify-center items-center bg-blue-500 rounded-full hover:bg-blue-600 transition"
              title="Telegram"
          >
            <i class="fab fa-telegram-plane text-white text-xl"></i>
          </a>
          <!-- Instagram Button -->
          <a
              href="https://www.instagram.com/your_instagram_link"
              target="_blank"
              class="w-8 h-8 flex justify-center items-center bg-pink-500 rounded-full hover:bg-pink-600 transition"
              title="Instagram"
          >
            <i class="fab fa-instagram text-white text-xl"></i>
          </a>
          <!-- LinkedIn Button -->
          <a
              href="https://www.linkedin.com/in/your_linkedin_profile"
              target="_blank"
              class="w-8 h-8 flex justify-center items-center bg-blue-700 rounded-full hover:bg-blue-800 transition"
              title="LinkedIn"
          >
            <i class="fab fa-linkedin text-white text-xl"></i>
          </a>
        </div>
      </aside>
    </transition>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      showSidebar: false,
      logo: logo,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    navigate(route) {
      this.$router.push(`/${route}`);
      this.showSidebar = false;
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
