<template>
  <div class="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
    <p class="font-semibold text-red-600 font-poppins">{{ title }}</p>
    <p class="text-gray-600 font-medium text-md">{{ value || "Not provided" }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String
  }
};
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
