<template>
  <div class="flex justify-center items-center min-h-screen bg-[#fdeae7] overflow-hidden">
    <!-- Phone frame only on large screens -->
    <div
        class="relative w-[390px] h-[844px] bg-black rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
        v-if="isLargeScreen"
    >
      <div class="flex-1 overflow-y-auto" @touchmove.prevent>
        <router-view class="bg-white"/>
      </div>
      <!-- Bottom Navbar inside phone frame -->
      <BottomNavbar v-if="!hideNavbar" class="w-full fixed bottom-0 z-30"/>
    </div>

    <!-- Fullscreen view on smaller screens -->
    <div class="w-full h-screen flex flex-col overflow-hidden" v-else>
      <div class="flex-1 overflow-y-auto relative" @touchmove.prevent>
        <router-view class="bg-white"/>
      </div>
      <BottomNavbar v-if="!hideNavbar" class="fixed bottom-0 w-full z-30"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import BottomNavbar from '@/layouts/BottomNavbar.vue';
import { useRoute } from 'vue-router';

const isLargeScreen = ref(window.innerWidth >= 1024);
const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
};
const route = useRoute();

// Hide navbar on specific routes
const hideNavbar = computed(() => route.path === '/login' || route.path === '/signup');

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
  document.body.style.overflow = 'hidden'; // Prevent scrolling
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
  document.body.style.overflow = ''; // Restore scrolling
});
</script>
