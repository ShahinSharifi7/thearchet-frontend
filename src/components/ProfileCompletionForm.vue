<template>
  <!-- Background Layer (Full Screen) -->

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
    <div class="absolute inset-0 w-full h-full  opacity-30 pointer-events-none"></div>

    <!-- Profile Form Container -->
    <div
        class="p-6 bg-white rounded-lg shadow-lg w-full overflow-y-auto bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">

      <form @submit.prevent="updateProfile" class="space-y-4">
        <!-- Profile Picture -->
        <div class="mt-4 flex flex-col items-center">
          <div class="relative">
            <img
                :src="profile_picture || defaultProfilePic"
                alt="Profile"
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <button
                type="button"
                class="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md"
                @click="triggerFileInput"
            >
              <font-awesome-icon :icon="['fas', 'pen']" class="text-gray-600"/>
            </button>
          </div>
          <!-- Profile Picture Upload Input -->
          <input
              ref="profileUpload"
              type="file"
              class="hidden"
              @change="handleFileUpload"
              accept="image/*"
          />
        </div>


        <div class="section-title">
          <span class="section-text">Personal Information</span>
        </div>

        <!-- First Name -->
        <div>
          <label class="block text-sm font-semibold">First Name</label>
          <input v-model="first_name" type="text" class="w-full p-2 border rounded-lg bg-white"/>
        </div>

        <!-- Last Name -->
        <div>
          <label class="block text-sm font-semibold">Last Name</label>
          <input v-model="last_name" type="text" class="w-full p-2 border rounded-lg"/>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold">Email</label>
          <input v-model="email" type="email" class="w-full p-2 border rounded-lg" disabled/>
        </div>

        <!-- Phone Number -->
        <div>
          <label class="block text-sm font-semibold">Phone Number</label>
          <input v-model="phone_number" type="tel" class="w-full p-2 border rounded-lg"/>
        </div>

        <!-- Birth Date -->
        <div>
          <label class="block text-sm font-semibold">Birth Date</label>
          <input v-model="birth_date" type="date" class="w-full p-2 border rounded-lg"/>
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-sm font-semibold">Gender</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="gender" value="0" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">Male</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="gender" value="1" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">Female</span>
            </label>
          </div>
        </div>

        <!-- Province -->
        <div>
          <label class="block text-sm font-semibold">Province</label>
          <select v-model="province" @change="updateCities" class="w-full p-2 border rounded-lg">
            <option value="" disabled>Select a province</option>
            <option v-for="(cities, prov) in provinces_cities" :key="prov" :value="prov">{{ prov }}</option>
          </select>
        </div>

        <!-- City -->
        <div>
          <label class="block text-sm font-semibold">City</label>
          <select v-model="city" :disabled="!province" class="w-full p-2 border rounded-lg">
            <option value="" disabled>Select a city</option>
            <option v-for="c in availableCities" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="section-title">
          <span class="section-text">Social Media</span>
        </div>

        <!-- Instagram -->
        <div>
          <label class="block text-sm font-semibold">Instagram</label>
          <input v-model="social_links.instagram" type="url" placeholder="https://instagram.com/yourprofile"
                 class="w-full p-2 border rounded-lg"/>
        </div>

        <!-- YouTube -->
        <div>
          <label class="block text-sm font-semibold">YouTube</label>
          <input v-model="social_links.youtube" type="url" placeholder="https://youtube.com/yourchannel"
                 class="w-full p-2 border rounded-lg"/>
        </div>

        <!-- SoundCloud -->
        <div>
          <label class="block text-sm font-semibold">SoundCloud</label>
          <input v-model="social_links.soundcloud" type="url" placeholder="https://soundcloud.com/yourchannel"
                 class="w-full p-2 border rounded-lg"/>
        </div>

        <!-- Spotify -->
        <div>
          <label class="block text-sm font-semibold">Spotify</label>
          <input v-model="social_links.spotify" type="url" placeholder="https://spotify.com/yourchannel"
                 class="w-full p-2 border rounded-lg"/>
        </div>

        <!-- Apple Music -->
        <div>
          <label class="block text-sm font-semibold">Apple Music</label>
          <input v-model="social_links.apple_music" type="url" placeholder="https://music.apple.com/yourprofile"
                 class="w-full p-2 border rounded-lg"/>
        </div>

        <div class="section-title">
          <span class="section-text">Personality</span>
        </div>

        <!-- Personality Questions -->
        <div>
          <label class="block text-sm font-semibold">Which one describes you better?</label>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="personality_social" value="E" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I enjoy being around people and sharing ideas.</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="personality_social" value="I" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I prefer spending time alone to reflect and recharge.</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold">Which one describes you better?</label>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="personality_detail" value="N" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I focus on the details and rely on concrete information.</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="personality_detail" value="S" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I look at the big picture and consider possibilities.</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold">Which one describes you better?</label>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="decision_making" value="F" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I make decisions based on logic and fairness.</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="decision_making" value="T" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I make decisions based on personal values and emotions.</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold">Which one describes you better?</label>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="planning_style" value="J" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I like to have a plan and stick to it.</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="planning_style" value="P" class="hidden peer"/>
              <span
                  class="inline-block p-2 rounded-md border-2 border-gray-300 cursor-pointer peer-checked:border-[#B7372B] bg-white peer-checked:text-[rgba(192,0,0,0.8)] transition duration-200">I prefer to go with the flow and keep my options open.</span>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="w-full text-white py-2 rounded-lg" style="background-color: #B7372B"
                :disabled="submitting">
          <span v-if="submitting">Saving...</span>
          <span v-else>Save</span>
        </button>
        <div class="h-20">

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {updateUserProfile, fetchUserProfile} from "@/utils/api";
import logo from "@/assets/New Logo.png";
import defaultProfilePic from "@/assets/avatar-default.svg";

export default {
  data() {
    return {
      loading: true,
      submitting: false,
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      profile_picture: "",
      birth_date: "",
      gender: "",
      personality_social: "",
      personality_detail: "",
      decision_making: "",
      planning_style: "",
      logo: logo,
      defaultProfilePic: defaultProfilePic,
      profilePicFile: null,  // To store the uploaded file
      redirectToQuestions: false,
      province: "",
      city: "",
      provinces_cities: {
        "Ontario": ["Toronto", "Ottawa", "Mississauga"],
        "Quebec": ["Montreal", "Quebec City", "Laval"],
        "British Columbia": ["Vancouver", "Victoria", "Kelowna"],
        "Alberta": ["Calgary", "Edmonton", "Red Deer"],
        "Manitoba": ["Winnipeg", "Brandon", "Steinbach"],
        "Saskatchewan": ["Regina", "Saskatoon", "Moose Jaw"],
        "Nova Scotia": ["Halifax", "Sydney"],
        "New Brunswick": ["Fredericton", "Saint John", "Moncton"],
        "Newfoundland and Labrador": ["St. John's", "Corner Brook"],
        "Prince Edward Island": ["Charlottetown", "Summerside"],
        "Northwest Territories": ["Yellowknife"],
        "Yukon": ["Whitehorse"],
        "Nunavut": ["Iqaluit"],
      },
      // Social Media Links
      social_links: {
        instagram: "",
        youtube: "",
        spotify: "",
        soundcloud: "",
        apple_music: "",
      }
    };
  },
  mounted() {
    this.loadProfileData();
  },
  computed: {
    availableCities() {
      return this.province ? this.provinces_cities[this.province] : [];
    },
  },
  methods: {
    updateCities() {
      this.city = "";
    },
    async loadProfileData() {
      try {
        const profileData = await fetchUserProfile();

        this.first_name = profileData.first_name || "";
        this.last_name = profileData.last_name || "";
        this.phone_number = profileData.phone_number || "";
        this.email = profileData.email || "";
        this.birth_date = profileData.birth_date || "";
        this.gender = profileData.gender || "";
        this.personality_social = profileData.personality_social || "";
        this.personality_detail = profileData.personality_detail || "";
        this.decision_making = profileData.decision_making || "";
        this.planning_style = profileData.planning_style || "";
        this.profile_picture = profileData.profile_picture;
        this.province = profileData.province;
        this.city = profileData.city;
        this.social_links.instagram = profileData.instagram || "";
        this.social_links.youtube = profileData.youtube || "";
        this.social_links.spotify = profileData.spotify || "";
        this.social_links.spotify = profileData.soundcloud || "";
        this.social_links.apple_music = profileData.apple_music || "";

        this.redirectToQuestions = this.$route.query.redirectToQuestions === 'true';
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        this.loading = false;
      }
    },
    async updateProfile() {
      const requiredFields = [
        this.birth_date,
        this.gender,
        this.phone_number,
        this.personality_social,
        this.personality_detail,
        this.decision_making,
        this.planning_style,
        this.city,
        this.province,
      ];

      if (requiredFields.some(field => !field)) {
        alert("Please fill in all required fields before saving.");
        return;  // Don't allow the user to save unless all fields are completed
      }
      try {
        this.submitting = true;
        const formData = new FormData();
        const fields = [
          "first_name", "last_name", "phone_number", "birth_date", "gender",
          "personality_social", "personality_detail", "decision_making", "planning_style",
          "province", "city",];
        fields.forEach(field => formData.append(field, this[field]));

        // Append social media links
        Object.keys(this.social_links).forEach((key) => {
          formData.append(`${key}`, this.social_links[key] ?? "");
        });

        // Check if there's a new profile picture and append it to the form data
        if (this.profilePicFile) {
          formData.append('profile_picture', this.profilePicFile);
        }

        await updateUserProfile(formData);
        alert("Your profile has been successfully updated!");
        // location.reload();
        if (this.redirectToQuestions) {
          this.submitting = false;
          this.$router.push('/instrument-question-wizard');
        }
        else {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
      } finally {
        this.submitting = false;
      }
    },
    triggerFileInput() {
      // Trigger the file input when the "edit" button is clicked
      this.$refs.profileUpload.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.profilePicFile = file;
        this.profile_picture = URL.createObjectURL(file);

        // Force reactivity update by resetting input
        this.$refs.profileUpload.value = "";
      }
    }
  },
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.section-title {
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 20px 0;
  position: relative;
}

.section-title::before,
.section-title::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc; /* Light gray line */
  margin: 0 10px;
}

.section-text {
  font-size: 1rem;
  font-weight: bold;
  color: Black; /* Red color matching theme */
  background: white;
  padding: 0 15px; /* Space around the text */
}

</style>