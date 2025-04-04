<template>
  <div class="h-full flex flex-col w-full bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">
    <!-- Loading Spinner (Covers Only Body) -->
    <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-40">
      <div class="loader-container flex flex-col items-center">
        <div class="loader"></div>
        <p class="text-gray-600 mt-3 font-semibold">Loading...</p>

        <!-- Show Ads ONLY if NOT Premium -->
        <div v-if="!isPremium"
             class="w-80 h-24 border-2 border-gray-300 flex items-center justify-center rounded-lg shadow-md bg-gray-100 mt-4">
          <span class="text-gray-500 font-bold text-lg">Your ads here</span>
        </div>
      </div>
    </div>
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>
    <!-- Header of having matches   -->
    <div v-if="hasMatches && !loading && !showQuestions"
         class="flex items-center justify-between w-full px-4 py-2 border-b bg-[#E9C3BF]">
      <!-- Back Button (Left) -->
      <button @click="redoQuestions" class="text-red-600 font-bold text-md">
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="text-xl"/>
      </button>

      <!-- Title (Centered) -->
      <h2 class="text-xl font-bold text-gray-900 flex-grow text-center">Your Matches</h2>

      <!-- Edit Button (Right) -->
      <button @click="$router.push('/matching-profile')" class="text-red-600 font-bold text-md">
        <font-awesome-icon :icon="['fas', 'user-edit']" class="text-xl"/>
      </button>
    </div>

    <!-- Questions Section   -->
    <div v-else-if="(!hasMatches || showQuestions) && !loading" class="flex flex-col h-full">
      <div>
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

        <!-- Questions Section (70%) -->
        <div class="flex flex-col items-center justify-center px-4 my-2 overflow-y-auto">
          <transition name="fade-question" mode="out-in">
            <div :key="currentIndex" v-if="questions.length" class="w-full text-center">
              <p class="text-question font-semibold mb-4">{{ questions[currentIndex].text }}</p>

              <!-- Scrollable options container -->
              <div
                  v-if="questions[currentIndex].type === 'Choice'"
                  class="w-full grid gap-3 max-h-95 overflow-y-auto px-2"
                  :class="{'grid-cols-2': questions[currentIndex].options.length > 4, 'grid-cols-1': questions[currentIndex].options.length <= 4}"
              >
                <label
                    v-for="option in questions[currentIndex].options"
                    :key="option.text"
                    class="option-label block w-full p-3 border rounded-lg text-center cursor-pointer transition-all"
                    :class="{
          'bg-[rgba(192,0,0,0.8)] text-white border-[#B7372B]': responses[questions[currentIndex].label] === option.text,
          'bg-gray-100 hover:bg-gray-200': responses[questions[currentIndex].label] !== option.text
        }"
                >
                  <input
                      type="radio"
                      v-model="responses[questions[currentIndex].label]"
                      :value="option.text"
                      class="hidden"
                      @click="goToNextQuestion(option.text)"
                  />
                  {{ option.text }}
                </label>
              </div>

              <!-- Text input for numerical value -->
              <div class="w-full flex flex-col gap-3" v-else-if="questions[currentIndex].type === 'Text'">
                <input
                    type="number"
                    v-model="responses[questions[currentIndex].label]"
                    class="border p-3 rounded-lg w-full text-center"
                    placeholder="Enter value in KM"
                />
              </div>
            </div>
          </transition>
        </div>


        <!-- Buttons Section (Fixed at the Bottom but Above BottomNavbar) -->
        <div
            class="buttons-container absolute bottom-[70px] left-0 w-full px-6 py-4 flex justify-between z-10">
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

    </div>
    <!-- Matched List Section -->
    <div v-if="hasMatches && !loading" class="flex-1 overflow-hidden">
      <div v-if="matches.length > 0" class="overflow-y-auto h-full px-4 py-1">
        <div class="w-full flex flex-col">
          <div v-for="(user, index) in matches" :key="user.username" class="border-b-2 pb-2 relative">

            <!-- Match Card -->
            <div class="mt-2 flex flex-row items-center bg-white p-4 rounded-lg relative shadow-xl">
              <!-- Profile Picture & Info (Blurred if Locked) -->
              <div v-if="isPremium || index >= 3" class="flex flex-row items-center">
                <img
                    :src="user.profile_picture || defaultProfilePic"
                    alt="Profile"
                    class="w-16 h-16 rounded-full shadow-lg"
                />
                <div class="ml-4 flex flex-col">
                  <h2 class="font-bold text-lg text-gray-900">
                    {{ user.first_name }} {{ user.last_name }}
                  </h2>
                  <span class="text-gray-600 text-sm">
                    {{ user.city }}, {{ user.province }}
                  </span>
                  <span class="text-red-600 text-sm">
                    {{ user.preferred_instrument }}
                  </span>
                </div>
              </div>

              <!-- Blurred Version for Non-Premium Users -->
              <div v-else class="flex flex-row items-center relative blur-md rounded-lg shadow-xl">
                <img
                    :src="user.profile_picture || defaultProfilePic"
                    alt="Profile"
                    class="w-16 h-16 rounded-full shadow-lg"
                />
                <div class="ml-4 flex flex-col">
                  <h2 class="font-bold text-lg text-gray-900">Locked</h2>
                  <span class="text-gray-600 text-sm">Upgrade to unlock</span>
                </div>
              </div>

              <!-- Lock Overlay (Only for first 3 non-premium users) -->
              <div v-if="!isPremium && index < 3" class="absolute inset-0 flex items-center justify-center">
                <div class="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 rounded-lg"></div>
                <button @click="goToPremium"
                        class="z-10 bg-yellow-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-md hover:bg-yellow-600 transition">
                  🔥 Unlock with Premium
                </button>
              </div>
            </div>

            <!-- View Profile Button (Disabled for Blurred Matches) -->
            <button
                @click="goToUserProfile(user.username)"
                class="text-gray-600 text-sm hover:underline w-full justify-center bg-white"
                :disabled="!isPremium && index < 3"
                :class="{ 'opacity-50 cursor-not-allowed': !isPremium && index < 3 }"
            >
              View Profile
            </button>

          </div>
          <div style="height: 50px"></div>
        </div>
      </div>

      <div v-else class="flex w-full my-2 text-center text-gray-600 justify-center items-center">
        Nobody found.
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";
import defaultProfilePic from "@/assets/avatar-default.svg";
import {fetchMatchingQuestions, hasMatches, getUserMatches, submitMatchingQuestionsAnswers} from "@/utils/api";

export default {
  data() {
    return {
      loading: true,
      submitting: false,
      logo: logo,
      defaultProfilePic: defaultProfilePic,
      questions: [],
      responses: {},
      currentIndex: 0,
      hasMatches: false,
      showQuestions: false,
      matches: [],
      isPremium: localStorage.getItem("is_premium") === "true" || false,
    }
  },
  async mounted() {
    this.showQuestions = this.$route.query.showQuestions === 'true';
    if (!this.isPremium) {
      setTimeout(async () => {
        const response = await hasMatches();
        this.hasMatches = response.has_matches;
        if (this.hasMatches && !this.showQuestions) {
          this.matches = await getUserMatches();
        } else {
          this.questions = await fetchMatchingQuestions();
        }
        this.loading = false;
      }, 2500);
    } else {
      // Premium users should only see loading if the request is running
      const response = await hasMatches();
      this.hasMatches = response.has_matches;
      if (this.hasMatches && !this.showQuestions) {
        this.matches = await getUserMatches();
      } else {
        console.log("comes here");
        this.questions = await fetchMatchingQuestions();
      }
      this.loading = false;
    }
  },
  computed: {
    // Check if all questions have been answered
    allQuestionsAnswered() {
      return this.questions.slice(0, -1).every(question => this.responses[question.label] !== undefined);
    }
  },
  methods: {
    startQuiz() {
      this.showWelcomeScreen = false;
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
        this.loading = true;
        const response = await submitMatchingQuestionsAnswers(this.responses);
        this.showQuestions = false;
        if (response === "Empty") {
          this.showQuestions = false;
          this.hasMatches = true;
        } else {
          this.$router.replace({
            query: {
              ...this.$route.query, // Preserve other query parameters
              showQuestions: false  // Set showQuestions to false
            }
          }).then(() => {
            location.reload(); // Reload the page after updating the query
          });
        }
        this.loading = false;
      } catch (error) {
        console.error("Error submitting answers:", error);
      }
    },
    goToNextQuestion(optionValue) {
      this.responses[this.questions[this.currentIndex].label] = optionValue;
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     this.clicked = false;
      //   }, 100); // Unlock after a short delay
      //   this.nextQuestion();
      // });
      setTimeout(() => {
        this.nextQuestion();
      }, 100);
    },
    async redoQuestions() {
      this.hasMatches = false;
      this.questions = await fetchMatchingQuestions();
    },
    goToUserProfile(username) {
      this.$router.push({name: 'user-profile', params: {username}});
    },
    goToPremium() {
      this.$router.push('/premium');
    },
  },
}
</script>


<style scoped>
.blur-md {
  filter: blur(5px);
  pointer-events: none;
}

/* Global Font Sizes - Relative to Screen Size */
html {
  font-size: 16px;
}

body {
  font-size: 1rem;
}

/* Font Sizes for Mobile Screens */
.text-title {
  font-size: 5vw; /* Responsive title font size */
}

.text-progress {
  font-size: 2vw; /* Progress font size */
}

.text-question {
  font-size: 4vw; /* Question font size */
}

/* Font Sizes for Options - Scaled down to fit */
.option-label {
  font-size: 3.5vw; /* Option font size relative to screen */
}

/* Large Screen (Phone Frame) Specific Styles */
@media (min-width: 1024px) {
  .text-title {
    font-size: calc(16px + (390px / 100) * 0.2); /* Title font size adjusted to frame */
  }

  .text-progress {
    font-size: calc(12px + (390px / 100) * 0.1); /* Progress font size adjusted to frame */
  }

  .text-question {
    font-size: calc(14px + (390px / 100) * 0.2); /* Question font size adjusted to frame */
  }

  .option-label {
    font-size: calc(12px + (390px / 100) * 0.15); /* Option font size adjusted to frame */
  }

  /* Adjust padding and margins for phone frame */
  .px-6 {
    padding-left: 3vw;
    padding-right: 3vw;
  }

  .py-4 {
    padding-top: 1.5vw;
    padding-bottom: 1.5vw;
  }
}

@media (max-width: 1023px) {
  /* For smaller screens, the text should scale relative to the screen */
  .text-title {
    font-size: 5vw; /* Title font size relative to screen size */
  }

  .text-progress {
    font-size: 3vw; /* Progress font size relative to screen size */
  }

  .text-question {
    font-size: 4vw; /* Question font size relative to screen size */
  }

  .option-label {
    font-size: 3.5vw; /* Option font size relative to screen size */
  }

  .px-6 {
    padding-left: 6vw;
    padding-right: 6vw;
  }

  .py-4 {
    padding-top: 1vw;
    padding-bottom: 1vw;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal Content */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.modal-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-content p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.modal-content button {
  font-size: 1rem;
}

.fade-question-enter-active,
.fade-question-leave-active {
  transition: all 0.5s ease;
}

.fade-question-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.fade-question-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>