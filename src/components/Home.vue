<template>
  <div class="home flex flex-col items-center h-full">
    <main class="flex flex-col justify-center items-center w-full">
      <div class="absolute inset-0 w-full h-full bg-[url('@/assets/background.png')] bg-repeat bg-[size:200px] opacity-30 pointer-events-none"></div>

      <div class="relative w-full h-[25vh] min-h-[25dvh] flex flex-col justify-center items-center text-white"
          :class="headerClass"
      >

        <!-- Pink Background Layer (Curved Border) -->
        <div class="absolute top-0 left-0 w-full h-[105%] bg-[#B7372B] clipped-bg"
             style="clip-path: ellipse(115% 85% at center top); opacity: 30%"></div>

        <!-- Red Foreground Layer -->
        <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#C00000]"
             style="clip-path: ellipse(110% 80% at center top);">

          <!-- Premium Button -->
          <button class="absolute top-6 left-6 bg-yellow-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-md hover:bg-yellow-600 transition"
                  @click="goToPremium">
            🔥 Go Premium
          </button>

          <!-- Profile Icon -->
          <button class="absolute top-6 right-6" @click="goToProfile">
            <img
                :src="profile_picture || defaultProfilePic"
                alt="Profile"
                class="w-10 h-10 rounded-full shadow-lg"
            />
          </button>

          <!-- Logo -->
          <img :src="logo" alt="Logo" class="h-[35%] w-auto"/>

          <!-- App Name -->
          <span class="text-[3dvh] modak mt-2">Archet</span>

        </div>
      </div>


      <div class="buttons grid grid-cols-2 gap-4 w-full max-w-[500px] mx-auto mt-2">
      <button
            class="items-center justify-center flex flex-col relative z-10"
            @click="handleInstrumentRecommendation">
          <img :src="instrumentRecommenderPic" alt="Instrument Recommender"
               class="h-auto w-32 max-w-[70px] sm:max-w-[90px] md:max-w-[90px] object-contain">


          <span class="font-bold mt-2 text-[#14212A]" :class="textSize">Instrument Recommender</span>
        </button>
        <button
            class="items-center justify-center flex flex-col relative z-10"
            @click="handleMusicPartner">
          <img :src="musicPartnerPic" alt="Music Partner"
               class="h-auto w-32 max-w-[70px] sm:max-w-[90px] md:max-w-[90px] object-contain">


          <span class="font-bold mt-2 text-[#14212A]" :class="textSize">Music Partner</span>
        </button>
        <button
            class="items-center justify-center flex flex-col relative z-10"
            @click="handleEvents">
          <img :src="musicPartnerPic" alt="Music Partner"
               class="h-auto w-32 max-w-[70px] sm:max-w-[90px] md:max-w-[90px] object-contain">


          <span class="font-bold mt-2 text-[#14212A]" :class="textSize">Events</span>
        </button>
        <button
            class="items-center justify-center flex flex-col relative z-10"
            @click="handleLearning">
          <img :src="learningPic" alt="Learning"
               class="h-auto w-32 max-w-[70px] sm:max-w-[90px] md:max-w-[90px] object-contain">

          <span class="font-bold mt-2 text-[#14212A]" :class="textSize">Learning</span>
        </button>
      </div>

    </main>
  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";
import instrumentRecommenderPic from "@/assets/instrument finder.png";
import musicPartnerPic from "@/assets/Matching.png";
import eventsPic from "@/assets/Events.png";
import learningPic from "@/assets/Learning.png";
import { checkProfileCompletion, fetchUserProfile } from "@/utils/api";
import {computed, onMounted, onUnmounted, ref} from "vue";
import defaultProfilePic from "@/assets/avatar-default.svg";  // Add this import if it's a separate API call

export default {
  name: "HomePage",
  data() {
    return {
      showSidebar: false,
      logo: logo,
      instrumentRecommenderPic: instrumentRecommenderPic,
      musicPartnerPic: musicPartnerPic,
      eventsPic: eventsPic,
      learningPic: learningPic,
      defaultProfilePic: defaultProfilePic,
      profile_picture: null,  // To store the uploaded file
      username: "",
      isProfileComplete: false,  // Track the profile completion status
    };
  },
  mounted() {
    this.loadProfileData();
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile');
    },
    goToPremium() {
      this.$router.push('/premium');
    },
    async loadProfileData() {
      try {
        const profileData = await fetchUserProfile();
        this.profile_picture = profileData.profile_picture;
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    async fetchProfileStatus() {
      try {
        this.isProfileComplete = await checkProfileCompletion();  // Assuming this API returns a boolean
      } catch (error) {
        console.error("Error checking profile completion:", error);
      }
    },
    async handleInstrumentRecommendation() {
      await this.fetchProfileStatus();  // Check profile status before navigating

      if (this.isProfileComplete) {
        this.$router.push('/instrument-recommendation');  // Redirect to question-wizard if profile is complete
      } else {
        // Redirect to the profile page and show a popup for completing the profile
        this.$router.push({ name: 'Profile', query: { redirectToQuestions: 'true' } });
        this.$nextTick(() => {
          // Show the pop-up (can be handled using a global state or event bus)
          alert("Please complete your profile first in order to use the Instrument Recommendation feature.");
        });
      }
    },
    handleMusicPartner() {
      this.$router.push('/matching-questions');
    },
    handleEvents() {
      this.$router.push('/events');
    },
    handleLearning() {
      this.$router.push('/learning');
    },
    logout() {
      this.$router.push("/login");
    },
  },
  setup() {
    const isLargeScreen = ref(window.innerWidth >= 1024);
    const updateScreenSize = () => {
      isLargeScreen.value = window.innerWidth >= 1024;
    };

    onMounted(() => {
      window.addEventListener("resize", updateScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateScreenSize);
    });

    // Compute class dynamically
    const headerClass = computed(() => (isLargeScreen.value ? "w-full" : "w-screen"));
    const textSize = computed(() => (isLargeScreen.value ? "text-[1.2vh]" : "text-[2.2vh]"));

    return { isLargeScreen, headerClass, textSize };
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
.clipped-bg {
 clip-path: ellipse(115% 85% at center top);
 -webkit-clip-path: ellipse(115% 85% at center top); /* Safari Fix */
}
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
</style>
