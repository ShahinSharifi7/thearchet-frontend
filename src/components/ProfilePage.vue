<template>
  <div class="h-full flex flex-col items-center overflow-hidden bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">
    <!-- Loading Spinner -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <div class="loader"></div>
    </div>

    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak mx-1">Archet</span>
    </div>

    <!-- Profile Container -->
    <div class="relative p-6 rounded-lg shadow-xl w-full max-w-[600px] mx-4 overflow-y-auto">
      <!-- Top Buttons (Back & Send Message) -->
      <div class="absolute top-4 left-4">
        <button @click="toMatchedList" class="text-red-600 font-bold text-md hover:underline">
          ← Back
        </button>
      </div>
      <div class="absolute top-4 right-4">
        <button @click="goToMessagePage" class="bg-red-600 text-white px-5 py-2 rounded-lg text-sm shadow-md hover:bg-red-700 transition-all">
          Send Message
        </button>
      </div>

      <!-- Profile Picture -->
      <div class="mt-12 flex flex-col items-center">
        <img
            :src="profile.profile_picture || defaultProfilePic"
            alt="Profile"
            class="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
        />
        <h2 class="font-bold text-2xl text-gray-900 mt-3 font-poppins">
          {{ profile.first_name || "Not provided" }} {{ profile.last_name || "" }}
        </h2>
        <p class="text-gray-500 font-medium text-md">{{ profile.city || "Not provided" }}, {{ profile.province || "Not provided" }}</p>
      </div>

      <!-- User Details -->
      <div class="mt-6 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Gender" :value="genderText"/>
          <InfoCard title="Age" :value="profile.age"/>
        </div>

        <div>
          <InfoCard title="Level of Expertise" :value="profile.level_of_expertise"/>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Owns Song" :value="profile.own_song"/>
          <InfoCard title="Favorite Genre" :value="profile.favorite_genre"/>
        </div>

        <div>
          <InfoCard title="Available Time" :value="profile.available_time"/>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Academic Knowledge" :value="profile.academic_knowledge"/>
          <InfoCard title="Preferred Instrument" :value="profile.preferred_instrument"/>
        </div>

        <div>
          <InfoCard title="Preferred Clothing" :value="profile.preferred_clothing"/>
        </div>
      </div>

      <!-- Social Media Links -->
      <div v-if="hasSocialLinks" class="mt-6 border-t pt-4">
        <h2 class="text-lg font-semibold text-gray-900 text-center">Follow on Social Media</h2>
        <div class="flex justify-center mt-3 space-x-4">
          <a v-if="profile.instagram" :href="profile.instagram" target="_blank" class="social-link">
            <font-awesome-icon :icon="['fab', 'instagram']" class="text-pink-600 text-2xl"/>
          </a>
          <a v-if="profile.spotify" :href="profile.spotify" target="_blank" class="social-link">
            <font-awesome-icon :icon="['fab', 'spotify']" class="text-green-600 text-2xl"/>
          </a>
          <a v-if="profile.soundcloud" :href="profile.soundcloud" target="_blank" class="social-link">
            <font-awesome-icon :icon="['fab', 'soundcloud']" class="text-orange-500 text-2xl"/>
          </a>
          <a v-if="profile.youtube" :href="profile.youtube" target="_blank" class="social-link">
            <font-awesome-icon :icon="['fab', 'youtube']" class="text-red-600 text-2xl"/>
          </a>
          <a v-if="profile.apple_music" :href="profile.apple_music" target="_blank" class="social-link">
            <font-awesome-icon :icon="['fab', 'apple']" class="text-gray-800 text-2xl"/>
          </a>
        </div>
      </div>

      <!-- Spacing for UI -->
      <div class="h-20">

      </div>
    </div>
  </div>
</template>

<script>
import { getUserProfileByUsername } from "@/utils/api";
import InfoCard from "@/components/InfoCard.vue";
import logo from "@/assets/New Logo.png";
import defaultProfilePic from "@/assets/avatar-default.svg";

export default {
  components: {
    InfoCard
  },
  data() {
    return {
      loading: true,
      logo: logo,
      defaultProfilePic: defaultProfilePic,
      profile: {
        first_name: '',
        last_name: '',
        gender: '',
        city: '',
        province: '',
        level_of_expertise: '',
        favorite_genre: '',
        available_time: '',
        own_song: '',
        academic_knowledge: '',
        preferred_instrument: '',
        preferred_clothing: '',
        age: '',
        profile_picture: '',
        instagram: '',
        spotify: '',
        soundcloud: '',
        youtube: '',
        apple_music: ''
      },
    };
  },
  async created() {
    const username = this.$route.params.username;
    await this.fetchUserProfile(username);
  },
  methods: {
    async fetchUserProfile(username) {
      try {
        this.loading = true;
        const response = await getUserProfileByUsername(username);
        if (response) {
          this.profile = response;
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        this.loading = false;
      }
    },
    toMatchedList() {
      this.$router.push({ name: 'MatchingQuestions' });
    },
    goToMessagePage() {
      this.$router.push({ name: 'NewMessage', query: { username: this.$route.params.username } });
    }
  },
  computed: {
    genderText() {
      if (!this.profile.gender) return "Not provided";
      return this.profile.gender === '0' ? 'Male' : this.profile.gender === '1' ? 'Female' : this.profile.gender;
    },
    hasSocialLinks() {
      return this.profile.instagram || this.profile.spotify || this.profile.soundcloud || this.profile.youtube || this.profile.apple_music;
    },
  }
};
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Card Styling */
.bg-gray-50 {
  background-color: #f9fafb;
}

.shadow-md {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.shadow-lg {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Button Styling */
button {
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.03);
}
</style>
