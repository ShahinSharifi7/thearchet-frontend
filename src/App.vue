<template>
  <div id="app" class="app-background">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import 'tailwindcss/tailwind.css';
@font-face {
  font-family: 'Modak';
  src: url("@/assets/Modak-Regular.ttf") format('truetype');
}
.modak {
  font-family: 'Modak', sans-serif;
}
</style>