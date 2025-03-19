<template>
  <div class="h-full flex flex-col w-full">
    <div class="flex justify-center items-center h-[10vh] w-full items-center"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak mx-1">Archet</span>
    </div>
    <!-- Welcome Screen (Only shows if hasSuggestion is false) -->
    <template v-if="showWelcomeScreen && !hasSuggestion">
      <div class="flex flex-col items-center h-full text-center px-6">
        <h2 class="text-title font-bold text-xl">🎵 Your musical journey starts here!</h2>
        <p class="text-gray-700 mt-6 text-sm text-left">🎯 Learn efficiently with an instrument that suits you!</p>
        <p class="text-gray-700 mt-1 text-sm text-left">🚀 Progress faster with the right instrument!</p>
        <p class="text-gray-700 mt-1 text-sm text-left">✅ No more trial and error! Start with confidence!</p>
        <button
            @click="startQuiz"
            class="px-6 py-3 mt-6 bg-red-600 text-white rounded-lg text-lg font-semibold transition-all hover:bg-red-700"
        >
          Let's Get Started!
        </button>
      </div>
    </template>

    <!-- Suggested Instrument Display -->
    <template v-else-if="hasSuggestion">
      <div class="flex flex-col items-center h-full overflow-y-auto">
        <h2 class="text-title font-bold">Your Suggested Instrument</h2>
        <img :src="suggestedInstrumentImageUrl" :alt="suggestedInstrument"
             class="w-32 h-32 mt-4 object-cover"/>
        <p class="text-lg font-semibold mt-4">{{ suggestedInstrument }}</p>
        <p class="text-gray-600 mt-2 text-center">Do you want to retake the exam?</p>
        <button
            @click="retakeExam"
            class="w-2/5 px-6 py-2 mt-4 bg-black text-white rounded-lg transition-all"
        >
          Retake Exam
        </button>
        <p class="text-gray-600 mt-2 text-center">Do you want to Start learning right away?</p>
        <button
            @click="toLearning"
            class="w-2/5 px-6 py-2 mt-4 bg-black text-white rounded-lg transition-all"
        >
          Learning
        </button>
        <p class="text-gray-600 mt-2 text-center">Are you looking for an instrument to buy?</p>
        <button
            @click="toStore"
            class="w-2/5 px-6 py-2 mt-4 bg-black text-white rounded-lg transition-all"
        >
          Store
        </button>
      </div>
    </template>

    <!-- Quiz Section -->
    <template v-else>
      <div class="flex flex-col h-full">
        <div class="flex flex-col items-center justify-center my-4">
          <h2 class="text-title font-bold">Answer the Questions</h2>
          <div class="w-3/4 mt-2 justify-center items-center text-center">
            <div class="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                  class="h-full transition-all" style="background-color: rgba(183,55,43, 0.8)"
                  :style="{ width: ((currentIndex + 1) / questions.length) * 100 + '%' }"
              ></div>
            </div>
            <p class="text-progress text-gray-600 mt-1">Question {{ currentIndex + 1 }} / {{ questions.length }}</p>
          </div>
        </div>

        <!-- Questions Section -->
        <div class="flex flex-col items-center px-4 flex-grow">
          <div v-if="questions.length" class="w-full text-center">
            <p class="text-question font-semibold mb-4">{{ questions[currentIndex].text }}</p>
            <div class="w-full flex flex-col gap-3">
              <label
                  v-for="option in questions[currentIndex].options"
                  :key="option.value"
                  class="option-label block w-full p-3 border rounded-lg text-center cursor-pointer transition-all"
                  :class="{
                    'bg-[rgba(192,0,0,0.8)] text-white border-[#B7372B]': responses[questions[currentIndex].label] === option.value,
                    'bg-gray-100 hover:bg-gray-200': responses[questions[currentIndex].label] !== option.value
                  }"
              >
                <input
                    type="radio"
                    v-model="responses[questions[currentIndex].label]"
                    :value="option.value"
                    class="hidden"
                    @click="goToNextQuestion(option.value)"
                />
                {{ option.text }}
              </label>
            </div>
          </div>
        </div>

        <!-- Buttons Section -->
        <div class="buttons-container absolute bottom-[70px] left-0 w-full px-6 py-4 flex justify-between z-10">
          <button
              @click="prevQuestion"
              :disabled="currentIndex === 0"
              class="px-6 py-2 rounded-lg transition-all disabled:bg-gray-300 bg-black text-white"
          >
            Previous
          </button>
          <button
              v-if="currentIndex === questions.length - 1"
              @click="submitAnswers"
              :disabled="!allQuestionsAnswered"
              class="px-6 py-2 text-white disabled:bg-gray-300 rounded-lg transition-all"
              style="background-color: rgba(192, 0, 0, 0.8)"
          >
            Submit
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { fetchInstrumentQuestions, submitInstrumentSuggestionAnswers, fetchLastInstrumentSuggestion } from "@/utils/api";
import logo from "@/assets/New Logo.png";

export default {
  data() {
    return {
      showWelcomeScreen: true, // Controls welcome screen visibility
      questions: [],
      responses: {},
      currentIndex: 0,
      suggestedInstrument: null,
      logo: logo,
      hasSuggestion: false,
      suggestedInstrumentImageUrl: "",
    };
  },
  async mounted() {
    const lastSuggestion = await fetchLastInstrumentSuggestion();
    if (lastSuggestion && lastSuggestion.suggested_instrument) {
      this.hasSuggestion = true;
      this.suggestedInstrument = lastSuggestion.suggested_instrument.name;
      this.suggestedInstrumentImageUrl = require(`@/assets/${this.suggestedInstrument}.png`);
    } else {
      this.questions = await fetchInstrumentQuestions();
    }
  },
  computed: {
    allQuestionsAnswered() {
      return this.questions.every(question => this.responses[question.label] !== undefined);
    }
  },
  methods: {
    startQuiz() {
      this.showWelcomeScreen = false; // Hide welcome screen and start quiz
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
    },
    prevQuestion() {
      this.currentIndex--;
    },
    async submitAnswers() {
      try {
        this.suggestedInstrument = await submitInstrumentSuggestionAnswers(this.responses);
        this.hasSuggestion = true;
        this.suggestedInstrumentImageUrl = require(`@/assets/${this.suggestedInstrument}.png`);
      } catch (error) {
        console.error("Error submitting answers:", error);
      }
    },
    goToNextQuestion(optionValue) {
      this.responses[this.questions[this.currentIndex].label] = optionValue;
      this.nextQuestion();
    },
    async retakeExam() {
      this.hasSuggestion = false;
      this.responses = {};
      this.currentIndex = 0;
      this.questions = await fetchInstrumentQuestions();
    },
    toStore() {
      this.$router.push({ name: 'StorePage'});
    },
    toLearning() {
      this.$router.push({ name: 'Learning'});
    }
  },
};
</script>

<style scoped>
/* Welcome Screen Styles */
.welcome-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 2rem;
  background-color: #fff;
  max-width: 600px;
  margin: auto;
}

.welcome-screen h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
}

.welcome-screen p {
  font-size: 1.2rem;
  color: #555;
  margin-top: 1rem;
}

.welcome-screen button {
  margin-top: 1.5rem;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #b7372b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.welcome-screen button:hover {
  background-color: #a32f25;
}
</style>
