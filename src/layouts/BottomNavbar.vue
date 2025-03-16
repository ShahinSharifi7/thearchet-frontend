<template>
  <div class="absolute bottom-0 w-full">
    <nav class="flex justify-around text-black rounded-t-xl" style="background-color: #E9C3BF;">
      <router-link
          to="/"
          class="flex flex-col items-center w-1/5 py-3"
          :class="{ 'selected' : isActive('/')}"
      >
        <i class="fas fa-home"></i>
        <span class="text-xs">Home</span>
      </router-link>
      <router-link
          to="/store"
          class="flex flex-col items-center w-1/5 py-3"
          :class="{ 'selected' : isActive('/store')}"
      >
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        <span class="text-xs">Store</span>
      </router-link>

      <router-link
          to="/messages"
          class="flex flex-col items-center w-1/5 py-3"
          :class="{ 'selected' : isActive('/messages')}"
      >
        <font-awesome-icon icon="message" />
        <span class="text-xs">Messages</span>
      </router-link>
      <router-link
          to="/more"
          class="flex flex-col items-center w-1/5 py-3"
          :class="{ 'selected' : isActive('/more')}"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
        <span class="text-xs">More</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path) => route.path === path;
</script>

<style scoped>
.selected {
  /*background-color: #c00000;*/
  /*transform: scale(1.2);*/
  color: #D04040;
  /*border-radius: 5px;*/
  /*transition: all 0.2s ease-in-out;*/
}
</style>