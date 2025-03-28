<template>
  <div class="flex flex-col items-center h-full">
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak mx-1">Archet</span>
    </div>

    <!-- Back Button -->
    <div class="relative w-full">
      <button @click="$router.push('/messages')" class="absolute top-2 left-2 text-red-600 font-bold text-md">
        ← Messages
      </button>
    </div>

    <!-- Message Form -->
    <div class="w-full max-w-md p-6 bg-white">
      <h2 class="text-xl font-bold mb-4 justify-center text-center">Sending Message</h2>
      <form @submit.prevent="sendMessage">
        <div class="mb-4">
          <label for="receiver" class="block text-sm font-medium text-gray-700">To</label>
          <input id="receiver" v-model="receiver" required disabled
                 class="cursor-not-allowed mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div class="mb-4">
          <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
          <input id="subject" v-model="subject" :disabled="isReply"
                 class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div class="mb-4">
          <label for="text" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea id="text" v-model="text" required
                    class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
        </div>

        <button type="submit" class="w-full bg-red-600 text-white p-2 rounded-lg shadow hover:bg-red-700">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";
import { sendMessage } from "@/utils/api.js";

export default {
  data() {
    return {
      logo,
      receiver: "",
      subject: "",
      text: "",
      parentId: null,
      isReply: false
    };
  },
  created() {
    const query = this.$route.query;
    if (query.username) this.receiver = query.username;
    if (query.subject) this.subject = query.subject;
    if (query.parentId) {
      this.parentId = query.parentId;
      this.isReply = true;
    }
  },
  methods: {
    async sendMessage() {
      const payload = {
        receiver: this.receiver,
        text: this.text,
        subject: this.subject,
      };

      if (this.parentId) {
        payload.parent = this.parentId;
      }

      try {
        await sendMessage(payload);
        this.$router.push('/messages');
      } catch (error) {
        console.error("Error sending message:", error?.response?.data || error.message);
        alert("Failed to send message.");
      }
    }
  }
};
</script>
