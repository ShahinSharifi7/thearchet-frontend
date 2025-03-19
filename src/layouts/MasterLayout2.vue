<template>
  <div class="flex justify-center items-center min-h-screen bg-[#fdeae7] overflow-hidden">
    <!-- Phone frame only on large screens -->
    <div
        class="relative w-[390px] h-[844px] bg-black rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
        v-if="isLargeScreen"
    >
      <div class="flex-1 overflow-y-auto scroll-container">
        <router-view class="bg-white"/>
      </div>
      <!-- Bottom Navbar inside phone frame -->
      <BottomNavbar v-if="!hideNavbar" class="w-full fixed bottom-0 z-30"/>
    </div>

    <!-- Fullscreen view on smaller screens -->
    <div class="w-full h-screen flex flex-col overflow-hidden" v-else>
      <div class="flex-1 overflow-y-auto scroll-container">
        <router-view class="bg-white"/>
      </div>
      <BottomNavbar
          v-if="!hideNavbar"
          class="fixed bottom-0 w-full z-30 transition-all duration-300"
          :class="{ 'translate-y-20 opacity-0 pointer-events-none': isKeyboardOpen }"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import BottomNavbar from '@/layouts/BottomNavbar.vue';
import { useRoute } from 'vue-router';

const isLargeScreen = ref(window.innerWidth >= 1024);
const isKeyboardOpen = ref(false);
const route = useRoute();

// Update screen size
const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
};

// Hide navbar on login/signup pages
const hideNavbar = computed(() => route.path === '/login' || route.path === '/signup');

// Detect if keyboard is open
const detectKeyboard = () => {
  const initialHeight = window.innerHeight;
  window.addEventListener('resize', () => {
    const newHeight = window.innerHeight;
    isKeyboardOpen.value = newHeight < initialHeight * 0.8; // Keyboard opens when height shrinks significantly
  });
};

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
  detectKeyboard();
  document.body.style.overflow = 'hidden'; // Prevent page scrolling
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
  document.body.style.overflow = ''; // Restore scrolling
});
</script>

<style>
/* Ensures the internal scroll container can scroll */
.scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
}

@supports (-webkit-touch-callout: none) {
  html, body {
    height: 100%;
    overflow: hidden;
  }
}

</style>
