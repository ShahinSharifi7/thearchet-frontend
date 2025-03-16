<template>
  <div class="h-full flex flex-col bg-white w-full">
    <div class="flex flex-col h-full">
      <!-- Title & Progress Bar -->
      <div class="flex flex-col items-center justify-center my-4">
        <h2 class="text-title font-bold">{{ title }}</h2>
        <div class="w-3/4 mt-2 justify-center items-center text-center">
          <div class="h-2 bg-gray-300 rounded-full overflow-hidden">
            <div class="h-full transition-all"
                 style="background-color: rgba(183,55,43, 0.8)"
                 :style="{ width: ((currentIndex + 1) / questions.length) * 100 + '%' }">
            </div>
          </div>
          <p class="text-progress text-gray-600 mt-1">
            Question {{ currentIndex + 1 }} / {{ questions.length }}
          </p>
        </div>
      </div>

      <!-- Question Section -->
      <div class="flex flex-col items-center justify-center px-4 my-2 flex-grow">
        <div v-if="questions.length" class="w-full text-center">
          <p class="text-question font-semibold mb-4">
            {{ questions[currentIndex].text }}
          </p>
          <div class="w-full flex flex-col gap-3">
            <label v-for="option in questions[currentIndex].options"
                   :key="option.value"
                   class="option-label block w-full p-3 border rounded-lg text-center cursor-pointer transition-all"
                   :class="{
                      'bg-[rgba(192,0,0,0.8)] text-white border-[#B7372B]': responses[questions[currentIndex].label] === option.value,
                      'bg-gray-100 hover:bg-gray-200': responses[questions[currentIndex].label] !== option.value
                     }"
                   @click="selectAnswer(option.value)">
              <input type="radio"
                     v-model="responses[questions[currentIndex].label]"
                     :value="option.value"
                     class="hidden"/>
              {{ option.text }}
            </label>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="buttons-container absolute bottom-[70px] left-0 w-full px-6 py-4 flex justify-between bg-white z-10">
        <button @click="prevQuestion"
                :disabled="currentIndex === 0"
                class="px-6 py-2 rounded-lg transition-all disabled:bg-gray-300 bg-black text-white">
          Previous
        </button>
        <button v-if="currentIndex === questions.length - 1"
                @click="submitAnswers"
                :disabled="!allQuestionsAnswered"
                class="px-6 py-2 text-white disabled:bg-gray-300 rounded-lg transition-all"
                style="background-color: rgba(192, 0, 0, 0.8)">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionWizard",
  props: {
    questions: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: "Answer the Questions"
    },
    submitResponses: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      currentIndex: 0,
      responses: {},
    };
  },
  computed: {
    allQuestionsAnswered() {
      return this.questions.every(q => this.responses[q.label] !== undefined);
    }
  },
  methods: {
    selectAnswer(value) {
      this.responses[this.questions[this.currentIndex].label] = value;
      this.$nextTick(() => {
        this.nextQuestion();
      });
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    async submitAnswers() {
      try {
        await this.submitResponses(this.responses);
      } catch (error) {
        console.error("Error submitting answers:", error);
      }
    },
  }
};
</script>

<style scoped>
</style>
