<template>
  <div class="message-detail flex flex-col items-center h-full bg-gray-100">
    <div class="flex justify-center items-center h-[10vh] w-full"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>
    <header class="w-full text-black p-4">
      <button @click="$router.push('/messages')" class="text-sm">&larr; Messages</button>
    </header>
    <!-- Loading Indicator -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div class="spinner-border text-blue-500" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else class="w-5/6 max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 class="text-xl font-bold mb-4">{{ message.subject}}</h2>
      <p><strong>From:</strong> {{ message.sender.username }}</p>
      <p><strong>To:</strong> {{ message.receiver.username }}</p>
      <p><strong>Date:</strong> {{ formatDate(message.created_at) }}</p>
      <p class="mt-4">{{ message.text || "" }}</p>
      <button @click="replyMessage" class="w-full bg-green-600 text-white p-2 rounded-lg shadow hover:bg-green-700 mt-4">
        Reply
      </button>
    </div>
  </div>
</template>

<script>
import {fetchMessageDetail} from "@/utils/api";
import {format} from "date-fns";
import logo from "@/assets/New Logo.png";

export default {
  data() {
    return {
      message: null,
      loading: true,
      logo: logo,
    };
  },
  async mounted() {
    const messageId = this.$route.params.messageId;
    try {
      this.message = await fetchMessageDetail(messageId);
      this.loading = false;  // Set loading to false once data is fetched
    } catch (error) {
      console.error("Failed to fetch message:", error);
      this.loading = false;  // Set loading to false even if there's an error
      // You can display an error message to the user if needed
    }
  },
  methods: {
    replyMessage() {
      this.$router.push({
        name: "NewMessage",
        state: {
          receiver: this.message.sender,
          subject: `Re: ${this.message.subject}`,
        },
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        console.error("Invalid date value:", dateString);
        return "Invalid Date"; // Return a default value if the date is invalid
      }
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    },
  },
};
</script>

<style>
</style>
