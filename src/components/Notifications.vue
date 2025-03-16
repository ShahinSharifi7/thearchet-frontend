<template>
  <div class="notifications flex flex-col items-center h-screen">
    <header class="w-full text-black text-bold p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Notifications</h1>
    </header>
    <div class="w-full flex-1 overflow-auto">
      <ul class="p-4 space-y-2">
        <li v-for="notification in notifications" :key="notification.id" class="p-4 bg-red-100 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
          <p><strong>Date:</strong> {{ notification.date }}</p>
          <p><strong>Message:</strong> {{ notification.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationsPage",
  data() {
    return {
      notifications: [
        { id: 1, text: "You changed your password.", date: "2025-01-10" },
        { id: 2, text: "You got a new message!", date: "2025-01-09" },
      ],
    };
  },
};
</script>

<style>
</style>