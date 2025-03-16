<template>
  <div class="message-detail flex flex-col items-center h-screen bg-gray-100">
    <header class="w-full text-black p-4">
      <button @click="$router.push('/messages')" class="text-sm">&larr; Messages</button>
    </header>

    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 class="text-xl font-bold mb-4">{{ message.subject}}</h2>
      <p><strong>From:</strong> {{ message.sender || "Me" }}</p>
      <p><strong>To:</strong> {{ message.receiver || "Me" }}</p>
      <p><strong>Date:</strong> {{ message.date }}</p>
      <p class="mt-4">{{ message.text || "" }}</p>
      <button @click="replyMessage" class="w-full bg-green-600 text-white p-2 rounded-lg shadow hover:bg-green-700 mt-4">
        Reply
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null,
    };
  },
  created() {
    const stateMessage = this.$route.state?.message;
    console.log(this.$route.state)
    if (stateMessage) {
      this.message = stateMessage;
    } else {
      console.error("No message found in state");
      // this.$router.push("/messages");
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
  },
};
</script>

<style>
</style>
