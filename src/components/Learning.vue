<template>
  <div
      class="h-full flex flex-col items-center overflow-hidden font-sans text-gray-800 tracking-wide bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">

    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full mx-1" style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <!-- Tabs -->
    <div class="tabs flex justify-between w-full bg-[#E9C3BF] shadow-md">
      <button
          @click="setActiveTab('online')"
          :class="activeTab === 'online' ? 'bg-red-500 text-white shadow-lg' : 'bg-[#E9C3BF] text-gray-800 hover:bg-[#d98d89]'"
          class="py-3 w-1/2 font-semibold transition-all duration-100 rounded-b-2xl">
        Online Courses
      </button>
      <button
          @click="setActiveTab('offline')"
          :class="activeTab === 'offline' ? 'bg-red-500 text-white shadow-lg' : 'bg-[#E9C3BF] text-gray-800 hover:bg-[#d98d89]'"
          class="py-3 w-1/2 font-semibold transition-all duration-100 rounded-b-2xl">
        Offline Videos
      </button>
    </div>

    <!-- Filter Section (Visible for both tabs) -->
    <div class="w-5/6 mt-4 flex flex-col space-y-4">
      <select v-model="selectedInstrument" class="p-2 border rounded-md w-full" @change="filterContent">
        <option value="">Select an Instrument</option>
        <option v-for="instrument in instrumentTypes" :key="instrument" :value="instrument">
          {{ instrument }}
        </option>
      </select>

      <select v-if="activeTab === 'offline'" v-model="selectedLevel" class="p-2 border rounded-md w-full" @change="filterContent">
        <option value="">Select a Level</option>
        <option v-for="level in levels" :key="level" :value="level">
          {{ level }}
        </option>
      </select>
    </div>

    <!-- Online Courses Section (Visible only for Online Courses) -->
    <div v-if="activeTab === 'online'" class="w-5/6 mt-8 overflow-y-auto">

      <div v-for="instructor in filteredInstructors" :key="instructor.name"
           class="items-center bg-white shadow-xl rounded-lg p-2 mb-2 border-2">
        <div class="flex flex-row items-center space-x-4">
          <img :src="instructor.profilePic" alt="Instructor" class="w-16 h-16 rounded-full">
          <div>
            <h3 class="text-xl font-semibold">{{ instructor.name }}</h3>
            <p class="text-sm text-gray-600">{{ instructor.scheduleDays }}</p>
            <p class="text-sm text-gray-600">{{ instructor.scheduleTime }}</p>
            <p class="text-sm text-gray-600 text-red-600">{{ instructor.instrument }}</p>
          </div>
        </div>
        <button @click="setSchedule(instructor)"
                class="text-gray-600 text-sm hover:underline w-full bg-white">
          Set Schedule
        </button>
      </div>
    </div>

    <!-- Video Section (Offline Videos) -->
    <div v-if="activeTab === 'offline'" class="h-full flex flex-col w-5/6 space-y-4 mt-4 overflow-y-auto">
      <div v-for="video in filteredVideos" :key="video.url"
           class="flex flex-col items-center border rounded-md shadow-lg p-4 bg-white">
        <h2 class="font-bold text-lg text-red-600">{{ video.instrument }} - {{ video.level }}</h2>
        <iframe class="w-full h-64 rounded-md mt-2" :src="video.url" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>

    <div style="height: 100px"></div>
    <!-- Reserve Class Modal -->
    <transition name="fade">
      <div v-if="showScheduleModal" class="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
          <h3 class="text-lg font-bold mb-4 text-center">Reserve a Class with {{ selectedInstructor?.name }}</h3>

          <div class="space-y-3">
            <div class="text-sm text-gray-700"><strong>Instrument:</strong> {{ selectedInstructor.instrument }}</div>
            <div class="text-sm text-gray-700"><strong>Days:</strong> {{ selectedInstructor.scheduleDays }}</div>
            <div class="text-sm text-gray-700"><strong>Time:</strong> {{ selectedInstructor.scheduleTime }}</div>

            <label class="block text-sm font-medium text-gray-700 mt-4">Preferred Date</label>
            <input type="date" v-model="preferredDate" class="w-full border rounded-md p-2"/>

            <label class="block text-sm font-medium text-gray-700">Preferred Time</label>
            <input type="time" v-model="preferredTime" class="w-full border rounded-md p-2"/>

            <button @click="submitSchedule" class="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 mt-4">
              Confirm Reservation
            </button>
            <button @click="closeScheduleModal" class="w-full mt-2 text-red-600 underline text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";
import defaultProfilePic from "@/assets/avatar-default.svg";

export default {
  name: "LearningPage",
  data() {
    return {
      logo: logo,
      activeTab: 'online',  // Default to 'online' tab
      selectedInstrument: "",
      defaultProfilePic: defaultProfilePic,
      selectedLevel: "",
      showScheduleModal: false,
      selectedInstructor: null,
      preferredDate: '',
      preferredTime: '',
      videos: [
        {instrument: "Electric Guitar", level: "Beginner", url: "https://www.youtube.com/embed/RY3AvEGKfZ0"},
        {instrument: "Acoustic Guitar", level: "Beginner", url: "https://www.youtube.com/embed/pfQVtapbFms"},
        {instrument: "Saxophone", level: "Beginner", url: "https://www.youtube.com/embed/ky716yPvrKE"},
        {instrument: "Drums", level: "Beginner", url: "https://www.youtube.com/embed/et9hU7QMDYU"},
        {instrument: "Piano", level: "Beginner", url: "https://www.youtube.com/embed/4SXQ_wlbWog"},
        {instrument: "Electric Guitar", level: "Intermediate", url: "https://www.youtube.com/embed/vFq0aMbq91Q"},
        {instrument: "Acoustic Guitar", level: "Intermediate", url: "https://www.youtube.com/embed/-iV-7XhUMT0"},
        {instrument: "Saxophone", level: "Intermediate", url: "https://www.youtube.com/embed/yVyiLFnAdeQ"},
        {instrument: "Drums", level: "Intermediate", url: "https://www.youtube.com/embed/p1pZ_SjhcVQ"},
        {instrument: "Piano", level: "Intermediate", url: "https://www.youtube.com/embed/312-_CUICv8"},
        {instrument: "Electric Guitar", level: "Advanced", url: "https://www.youtube.com/embed/zY-F2oinexQ"},
        {instrument: "Acoustic Guitar", level: "Advanced", url: "https://www.youtube.com/embed/oUR8HHOGKiQ"},
        {instrument: "Saxophone", level: "Advanced", url: "https://www.youtube.com/embed/atJHtqJfe7s"},
        {instrument: "Drums", level: "Advanced", url: "https://www.youtube.com/embed/X41sRwjMX3U"},
        {instrument: "Piano", level: "Advanced", url: "https://www.youtube.com/embed/mPuxe6BLiTM"}
      ],
      instructors: [
        {
          name: "John Doe",
          profilePic: defaultProfilePic,
          scheduleDays: "Monday to Friday",
          scheduleTime: "10 AM to 6 PM",
          instrument: "Piano",
          level: "Beginner",
        },
        {
          name: "Alex Neo",
          profilePic: defaultProfilePic,
          scheduleDays: "Saturday - Sunday",
          scheduleTime: "10 AM to 8 PM",
          instrument: "Piano",
          level: "Beginner",
        },
        {
          name: "Leo James",
          profilePic: defaultProfilePic,
          scheduleDays: "From Monday to Wednesday",
          scheduleTime: "2 PM to 10 PM",
          instrument: "Drums and Percussion",
          level: "Beginner",
        },
        {
          name: "Jane Smith",
          profilePic: defaultProfilePic,
          scheduleDays: "Monday to Friday",
          scheduleTime: "9 AM to 5 PM",
          instrument: "Electric Guitar",
          level: "Advanced",
        },
        {
          name: "Mike Lane",
          profilePic: defaultProfilePic,
          scheduleDays: "Monday to Friday",
          scheduleTime: "10 AM to 6 PM",
          instrument: "Acoustic Guitar",
          level: "Advanced",
        },
        {
          name: "Nina Blue",
          profilePic: defaultProfilePic,
          scheduleDays: "Tuesday to Saturday",
          scheduleTime: "12 PM to 8 PM",
          instrument: "Saxophone",
          level: "Intermediate",
        },
        {
          name: "Carlos Vega",
          profilePic: defaultProfilePic,
          scheduleDays: "Monday to Thursday",
          scheduleTime: "11 AM to 7 PM",
          instrument: "Drums",
          level: "Intermediate",
        },
      ]


    };
  },
  computed: {
    instrumentTypes() {
      return [...new Set(this.videos.map(video => video.instrument))];
    },
    levels() {
      return [...new Set(this.videos.map(video => video.level))];
    },
    filteredVideos() {
      return this.videos.filter(video =>
          (!this.selectedInstrument || video.instrument === this.selectedInstrument) &&
          (!this.selectedLevel || video.level === this.selectedLevel)
      );
    },
    filteredInstructors() {
      return this.instructors.filter(instructor =>
          (!this.selectedInstrument || instructor.instrument.includes(this.selectedInstrument))
      );
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    filterContent() {
      console.log("Filtering by:", this.selectedInstrument, this.selectedLevel);
    },
    setSchedule(instructor) {
      this.selectedInstructor = instructor;
      this.showScheduleModal = true;
    },
    closeScheduleModal() {
      this.showScheduleModal = false;
      this.selectedInstructor = null;
      this.preferredDate = '';
      this.preferredTime = '';
    },
    submitSchedule() {
      if (!this.preferredDate || !this.preferredTime) {
        alert("Please select both date and time.");
        return;
      }

      // Here, you can send the reservation to your backend via API.
      alert(`Reserved a class with ${this.selectedInstructor.name} on ${this.preferredDate} at ${this.preferredTime}`);

      this.closeScheduleModal();
    },
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
