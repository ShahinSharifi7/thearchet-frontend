<template>
  <div class="h-full flex flex-col items-center font-sans text-gray-800 tracking-wide bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">

    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full" style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <!-- Form Container -->
    <div class="w-full max-w-md mt-10 p-6">
      <h2 class="text-2xl font-bold text-center mb-4">Contact Us</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- Reason -->
        <div>
          <label for="reason" class="block text-sm font-medium text-gray-700">Reason for Contact</label>
          <select
              v-model="reason"
              id="reason"
              class="mt-1 block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring focus:ring-red-300"
              required
          >
            <option value="">Select a reason</option>
            <option value="issue">Report an Issue</option>
            <option value="feedback">Give Feedback</option>
          </select>
        </div>

        <!-- Upload -->
        <div>
          <label for="file" class="block text-sm font-medium text-gray-700">Upload Photo/Video</label>
          <input
              type="file"
              id="file"
              accept="image/*,video/*"
              @change="handleFileUpload"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
              v-model="message"
              id="message"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-300"
              placeholder="Write your message here..."
              required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
            type="submit"
            class="w-full py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-all"
        >
          Send Message
        </button>
      </form>
    </div>

    <div style="height: 100px"></div>
  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";

export default {
  data() {
    return {
      reason: "",
      message: "",
      file: null,
      logo,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    handleSubmit() {
      if (!this.reason || !this.message) {
        alert("Please fill out all required fields.");
        return;
      }

      console.log({
        reason: this.reason,
        message: this.message,
        file: this.file,
      });

      alert("Your message has been sent successfully!");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>
