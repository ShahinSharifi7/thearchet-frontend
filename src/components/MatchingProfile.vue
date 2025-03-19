<template>
  <div class="h-full flex flex-col items-center overflow-hidden relative z-10">
    <!-- Loading Spinner -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <div class="loader"></div>
    </div>

    <!-- Header -->
    <div class="relative z-20 flex justify-center items-center h-[10vh] w-full mx-1"
         style="background-color: #C00000; color: white;">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <template v-if="showWelcomeScreen">
      <div class="flex flex-col items-center h-full text-left px-6 max-w-[600px] mx-auto mt-4">
        <h2 class="text-title font-bold text-center w-full">Find your perfect music partner!</h2>
        <div class="flex flex-col items-start w-full mt-6">
          <p class="text-gray-700 text-sm flex items-center">
            <font-awesome-icon :icon="['fas', 'circle']" class="text-red-600 text-md mr-2" />
            Team up with someone who matches your rhythm and goals!
          </p>
          <p class="text-gray-700 text-sm flex items-center mt-4">
            <font-awesome-icon :icon="['fas', 'circle']" class="text-red-600 text-md mr-2" />
            Boost your learning and creativity with the right partner!
          </p>
          <p class="text-gray-700 text-sm flex items-center mt-4">
            <font-awesome-icon :icon="['fas', 'circle']" class="text-red-600 text-md mr-2" />
            No more solo struggles—collaborate with the ideal match!
          </p>
          <p class="text-gray-700 text-sm flex items-center mt-4">
            <font-awesome-icon :icon="['fas', 'circle']" class="text-red-600 text-md mr-2" />
            Practice smarter, not harder—connect with your musical match today!
          </p>
          <p class="text-gray-700 text-sm flex items-center mt-4">
            <font-awesome-icon :icon="['fas', 'circle']" class="text-red-600 text-md mr-2" />
            Achieve harmony—pair up with someone who shares your passion and pace!
          </p>
        </div>


        <button
            @click="hideWelcome"
            class="px-6 py-3 mt-6 bg-red-600 text-white rounded-lg text-lg font-semibold transition-all hover:bg-red-700"
        >
          Let's Get Started!
        </button>
      </div>
    </template>

    <!-- Profile Form Container -->
    <div v-else class="p-6 bg-white w-full h-full overflow-y-auto bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">
      <h2 class="text-xl font-bold text-center">Fill out your matching profile</h2>

      <form @submit.prevent="updateProfile" class="space-y-4">

        <!-- Preferred Instrument -->
        <div>
          <label class="block text-sm font-semibold">Select your preferred instrument:</label>
          <select v-model="preferred_instrument" class="w-full p-2 border rounded-lg bg-white">
            <option value="" disabled>Select an instrument</option>
            <option v-for="instrument in instruments" :key="instrument" :value="instrument">{{ instrument }}</option>
          </select>
        </div>

        <!-- Expertise Level -->
        <div>
          <label class="block text-sm font-semibold">What is your level of expertise?</label>
          <select v-model="level_of_expertise" class="w-full p-2 border rounded-lg bg-white">
            <option value="" disabled>Select your level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <!-- Favorite Music Genre -->
        <div>
          <label class="block text-sm font-semibold">What is your favorite music genre?</label>
          <select v-model="favorite_genre" class="w-full p-2 border rounded-lg bg-white">
            <option value="" disabled>Select your favorite genre</option>
            <option v-for="genre in musicGenres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>

        <!-- Time Commitment -->
        <div>
          <label class="block text-sm font-semibold">How much time can you dedicate to the band?</label>
          <select v-model="available_time" class="w-full p-2 border rounded-lg bg-white">
            <option value="" disabled>Select your level of commitment</option>
            <option value="A light commitment for casual collaboration.">A light commitment for casual collaboration.</option>
            <option value="A moderate commitment to maintain progress.">A moderate commitment to maintain progress.</option>
            <option value="A serious commitment to improve and prepare for performances.">A serious commitment to improve and prepare for performances.</option>
            <option value="A highly dedicated, professional-level commitment.">A highly dedicated, professional-level commitment.</option>
          </select>
        </div>

        <!-- Own Song -->
        <div>
          <label class="block text-sm font-semibold">Do you have your own song?</label>
          <select v-model="own_song" class="w-full p-2 border rounded-lg bg-white">
            <option value="" disabled>Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <!-- Formal Academic Knowledge in Music -->
        <div>
          <label class="block text-sm font-semibold">Do you have formal academic knowledge in music?</label>
          <select v-model="academic_knowledge" class="w-full p-2 border rounded-lg bg-white">
            <option value="" disabled>Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <!-- Preferred Clothing Style -->
        <div>
          <label class="block text-sm font-semibold">What is your preferred clothing style?</label>
          <select v-model="preferred_clothing" class="w-full p-2 border rounded-lg bg-white">
            <option value="" disabled>Select your style</option>
            <option value="Classic and Formal">Classic and Formal</option>
            <option value="Vintage-Inspired">Vintage-Inspired</option>
            <option value="Sporty and Active">Sporty and Active</option>
            <option value="Urban and Street Style">Urban and Street Style</option>
            <option value="Dark and Gothic">Dark and Gothic</option>
          </select>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="w-full text-white py-2 rounded-lg" style="background-color: #B7372B" :disabled="submitting">
          <span v-if="submitting">Saving...</span>
          <span v-else>Save</span>
        </button>
        <div class="h-10">

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { updateUserProfile, fetchUserProfile } from "@/utils/api";
import logo from "@/assets/New Logo.png";

export default {
  data() {
    return {
      loading: true,
      submitting: false,
      showWelcomeScreen: false,
      preferred_instrument: "",
      level_of_expertise: "",
      favorite_genre: "",
      available_time: "",
      own_song: "",
      academic_knowledge: "",
      preferred_clothing: "",
      redirectToMatchingQuestions: false,
      instruments: [
        "Electric Guitar", "Saxophone", "Drums and Percussion", "Violin",
        "Acoustic Guitar", "Piano", "Cello", "Flute"
      ],
      musicGenres: [
        "Classical", "Jazz", "Blues", "Dance", "Rock", "Traditional",
        "Country", "Latin", "Pop", "EDM", "Experimental", "Funk"
      ],
      logo: logo
    };
  },
  async mounted() {
    this.redirectToMatchingQuestions = this.$route.query.redirectToMatchingQuestions === 'true';
    await this.loadProfileData();
  },
  methods: {
    async loadProfileData() {
      try {
        const profileData = await fetchUserProfile();
        this.preferred_instrument = profileData.preferred_instrument || "";
        this.level_of_expertise = profileData.level_of_expertise || "";
        this.favorite_genre = profileData.favorite_genre || "";
        this.available_time = profileData.available_time || "";
        this.own_song = profileData.own_song || "";
        this.academic_knowledge = profileData.academic_knowledge || "";
        this.preferred_clothing = profileData.preferred_clothing || "";
        if (this.preferred_instrument === "") {
          this.showWelcomeScreen = true;
        }
        else {
          this.showWelcomeScreen = false;
          if (this.redirectToMatchingQuestions) {
            this.$router.push('/matching-questions');
          }
        }
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        this.loading = false;
      }
    },
    async updateProfile() {
      // List of required fields
      const requiredFields = [
        "preferred_instrument", "level_of_expertise", "favorite_genre",
        "available_time", "own_song", "academic_knowledge", "preferred_clothing"
      ];

      // Check for empty fields
      const missingFields = requiredFields.filter(field => !this[field]);

      if (missingFields.length > 0) {
        alert("Please fill in all required fields before submitting.");
        return;
      }

      try {
        this.submitting = true;
        const formData = new FormData();

        requiredFields.forEach(field => formData.append(field, this[field]));

        await updateUserProfile(formData);

        if (!this.redirectToMatchingQuestions) {
          this.$router.push({ name: 'MatchingQuestions', query: { showQuestions: 'true' } });
          return;
        }
        this.$router.push('/matching-questions');
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Please try again.");
      } finally {
        this.submitting = false;
      }
    },
    hideWelcome() {
      this.showWelcomeScreen = false;
    }
  }
};
</script>

<style>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #b7372b;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.section-title {
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: #B7372B;
}
</style>
