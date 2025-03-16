<template>
  <div class="flex flex-col justify-center items-center h-full">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-4">Contact Us</h2>
      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Reason for Contact -->
        <div class="p-1">
          <label for="reason" class="block text-sm font-medium text-black">
            Reason for Contact
          </label>
          <select
              v-model="reason"
              id="reason"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              required
          >
            <option value="">Select a reason</option>
            <option value="issue">Report an Issue</option>
            <option value="feedback">Give Feedback</option>
          </select>
        </div>
        <!-- Upload Photo or Video -->
        <div class="p-1">
          <label for="file" class="block text-sm font-medium text-black">
            Upload Photo/Video
          </label>
          <input
              type="file"
              id="file"
              accept="image/*,video/*"
              @change="handleFileUpload"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <!-- Message -->
        <div class="p-1">
          <label for="message" class="block text-sm font-medium text-black">
            Message
          </label>
          <textarea
              v-model="message"
              id="message"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              placeholder="Write your message here..."
              required
          ></textarea>
        </div>
        <!-- Submit Button -->
        <div>
          <button
              type="submit"
              class="w-full px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reason: "",
      message: "",
      file: null,
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

      // Simulate sending data to the server
      console.log({
        reason: this.reason,
        message: this.message,
        file: this.file,
      });

      // Show success message
      alert("Your message has been sent successfully!");

      // Redirect to home page
      this.$router.push("/");
    },
  },
};
</script>

<style>
@import "tailwindcss/tailwind.css";
</style>
