<template>
  <div id="app" class="app-background">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // Dynamically add the Google Ads script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.setAttribute('data-ad-client', 'ca-pub-7088976414557960');
    document.head.appendChild(script);
  },
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