<template>
  <div class="h-full bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">
    <div class="w-full">
      <div v-if="isProfileComplete === null">Loading...</div>

      <div v-else-if="isProfileComplete">
        <QuestionWizard/>
      </div>

      <div v-else>
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <p class="text-lg font-semibold">You need to complete your profile before proceeding.</p>
          <ProfileCompletionForm @profile-updated="fetchProfileStatus" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkProfileCompletion } from "@/utils/api";
import ProfileCompletionForm from "@/components/ProfileCompletionForm.vue";
import QuestionWizard from "@/components/InstrumentQuestionWizard.vue";
import logo from "@/assets/New Logo.png";

export default {
  components: { ProfileCompletionForm, QuestionWizard },
  data() {
    return {
      isProfileComplete: null,
      logo: logo
    };
  },
  async mounted() {
    await this.fetchProfileStatus();
  },
  methods: {
    async fetchProfileStatus() {
      try {
        this.isProfileComplete = await checkProfileCompletion();
      } catch (error) {
        console.error("Error checking profile completion:", error);
      }
    },
  },
};
</script>
<style scoped>
</style>
