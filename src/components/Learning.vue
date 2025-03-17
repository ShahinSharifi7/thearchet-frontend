<template>
  <div
      class="h-full flex flex-col items-center overflow-hidden font-sans text-gray-800 tracking-wide bg-[url('@/assets/background-low-op.png')] bg-repeat bg-[size:200px]">
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full mx-1"
         style="background-color: #D04040; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <!-- Filter Section -->
    <div class="w-5/6 mt-4 flex flex-col space-y-4">
      <select v-model="selectedInstrument" class="p-2 border rounded-md w-full" @change="filterVideos">
        <option value="">All Instruments</option>
        <option v-for="instrument in instrumentTypes" :key="instrument" :value="instrument">
          {{ instrument }}
        </option>
      </select>

      <select v-model="selectedLevel" class="p-2 border rounded-md w-full" @change="filterVideos">
        <option value="">All Levels</option>
        <option v-for="level in levels" :key="level" :value="level">
          {{ level }}
        </option>
      </select>
    </div>

    <!-- Video Section -->
    <div class="h-full flex flex-col w-5/6 space-y-4 mt-4 overflow-y-auto">
      <div v-for="video in filteredVideos" :key="video.url"
           class="flex flex-col items-center border rounded-md shadow-lg p-4 bg-white">
        <h2 class="font-bold text-lg">{{ video.instrument }} - {{ video.level }}</h2>
        <iframe class="w-full h-64 rounded-md mt-2" :src="video.url" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import logo from "@/assets/New Logo.png";

export default {
  name: "LearningPage",
  data() {
    return {
      logo: logo,
      selectedInstrument: "",
      selectedLevel: "",
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
    }
  },
  methods: {
    filterVideos() {
      console.log("Filtering by:", this.selectedInstrument, this.selectedLevel);
    }
  }
};
</script>

<style scoped>
/* Custom styling for learning page */
</style>
