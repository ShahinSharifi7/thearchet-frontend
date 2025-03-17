<template>
  <div class="flex flex-col items-center h-full">
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full"
         style="background-color: #D04040; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak mx-1">Archet</span>
    </div>

    <!-- Tabs -->
    <div class="tabs flex justify-between w-full bg-[#E9C3BF] shadow-md">
      <button
          @click="setActiveTab('received')"
          :class="activeTab === 'received' ? 'bg-red-500 text-white shadow-lg' : 'bg-[#E9C3BF] text-gray-800 hover:bg-[#d98d89]'"
          class="py-3 w-1/3 font-semibold transition-all duration-100 rounded-b-2xl">
        Received
      </button>

      <button @click="createNewMessage"
              class="bg-black text-white px-5 py-2 mx-2 rounded-full shadow-md flex items-center gap-2">
        <font-awesome-icon icon="plus"/>
        New
      </button>

      <button
          @click="setActiveTab('sent')"
          :class="activeTab === 'sent' ? 'bg-red-500 text-white shadow-lg' : 'bg-[#E9C3BF] text-gray-800 hover:bg-[#d98d89]'"
          class="py-3 w-1/3 font-semibold transition-all duration-100 rounded-b-2xl">
        Sent
      </button>
    </div>

    <!-- Messages List -->
    <div class="w-full flex-1 overflow-y-auto overflow-x-hidden p-4">
      <ul v-if="activeTab === 'received'" class="space-y-2">
        <li v-for="message in receivedMessages" :key="message.id"
            class="flex items-center bg-white shadow justify-center rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition relative"
            @click="viewMessage(message)">

          <!-- Profile Picture -->
          <img :src="message.sender.profile_picture || defaultProfilePic"
               alt="Profile"
               class="w-12 h-12 rounded-full object-cover mr-3">

          <!-- Message Content -->
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900">
                {{ truncateText(message.subject) }}
              </h3>
              <span class="text-xs text-gray-500">
                {{ formatDate(message.date) }}
              </span>
            </div>

            <p class="text-gray-700 text-sm truncate w-full">
              {{ truncateText(message.text, 40) }}
            </p>

            <!-- Reply Button -->
<!--            <span @click.stop="replyMessage(message)"-->
<!--                  class="absolute bottom-2 right-3 text-xs text-blue-500 hover:underline cursor-pointer">-->
<!--              <font-awesome-icon :icon="['fas', 'reply']" />-->
<!--            </span>-->
<!--            &lt;!&ndash; Delete Button &ndash;&gt;-->
<!--            <button @click.stop="deleteMessage(message.id)" class="absolute bottom-2 right-7 text-red-500 hover:text-red-700 ml-3">-->
<!--              <i class="fas fa-trash"></i>-->
<!--            </button>-->
          </div>
        </li>
      </ul>

      <ul v-if="activeTab === 'sent'" class="space-y-2">
        <li v-for="message in sentMessages" :key="message.id"
            class="flex items-center bg-white shadow rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition">

          <!-- Profile Picture -->
          <img :src="message.receiver.profile_picture || defaultProfilePic"
               alt="Profile"
               class="w-12 h-12 rounded-full object-cover mr-3">

          <!-- Message Content -->
          <div class="flex-1">
            <div class="flex justify-between items-center">
              <h3 class="font-semibold text-gray-900">
                {{ truncateText(message.subject) }}
              </h3>
              <span class="text-xs text-gray-500">
                {{ formatDate(message.created_at) }}
              </span>
            </div>

            <p class="text-gray-700 text-sm truncate w-full">
              {{ truncateText(message.text, 40) }}
            </p>
            <!-- Delete Button -->
<!--            <button @click.stop="deleteMessage(message.id)" class="text-red-500 hover:text-red-700 ml-3">-->
<!--              <i class="fas fa-trash"></i>-->
<!--            </button>-->
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";
import defaultProfilePic from "@/assets/avatar-default.svg";
import {sentMessages, receivedMessages} from "@/utils/api.js"
import { format } from 'date-fns';


export default {
  name: "MessagesPage",
  data() {
    return {
      activeTab: 'received',
      receivedMessages: [],
      sentMessages: [],
      logo: logo,
      defaultProfilePic: defaultProfilePic,
    };
  },
  methods: {
    async setActiveTab(tab) {
      this.activeTab = tab;
      if (tab === "received") {
        const response = await receivedMessages();
        this.receivedMessages = response.results;
      }
      else {
        const response = await sentMessages();
        this.sentMessages = response.results;
      }
    },
    createNewMessage() {
      this.$router.push("/new-message");
    },
    viewMessage(message) {
      console.log("Opening message:", message);
      this.$router.push({ name: 'MessageDetail', state: { message } });
    },
    replyMessage(message) {
      console.log("Replying to:", message);
      // Implement reply logic
    },
    deleteMessage(id) {
      console.log("Deleting message:", id);
      // Implement delete logic
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    },
    truncateText(text, max=15) {
      if (text.length > max) {
        return text.substring(0, max) + '...';
      }
      return text;
    },
  }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
