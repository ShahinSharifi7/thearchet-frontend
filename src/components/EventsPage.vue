<template>
  <div class="h-full flex flex-col items-center overflow-hidden font-sans text-gray-800 tracking-wide">
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full mx-1"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <div class="h-full w-full flex flex-col items-center p-4">
      <!--    loading -->
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
        <div class="loader"></div>
      </div>
      <FullCalendar ref="fullCalendar" :options="calendarOptions" class="w-full h-full border-2 border-gray-100"/>
      <div style="height: 50px"></div>
      <Dialog v-if="selectedEvents.length" @close="selectedEvents = []"
              class="shadow-lg border-2 border-gray-100 rounded-md">
        <template #title>Events on {{ selectedDate }}</template>
        <ul class="p-4 space-y-4">
          <li v-for="event in selectedEvents" :key="event.id" class="p-4 bg-gray-100 rounded-lg shadow flex items-center">
            <!-- Event Image (if available) -->
<!--            <img v-if="event.image" :src="event.image" alt="Event Image" class="w-20 h-20 rounded-md object-cover mr-4" />-->

            <!-- Event Details -->
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="text-red-500 mr-2" />
                {{ event.title }}
              </h3>

              <p class="text-gray-700 text-sm flex items-center mt-1">
                <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="text-blue-500 mr-2" />
                {{ event.location }}
              </p>

<!--              <p class="text-gray-700 text-sm flex items-center mt-1">-->
<!--                <font-awesome-icon :icon="['fas', 'clock']" class="text-green-500 mr-2" />-->
<!--                {{ event.time || 'Time not specified' }}-->
<!--              </p>-->

              <!-- More Info Button -->
              <a :href="event.link" target="_blank"
                 class="mt-2 inline-block bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition">
                <font-awesome-icon :icon="['fas', 'external-link-alt']" class="mr-1" /> More Info
              </a>
            </div>
          </li>
        </ul>

      </Dialog>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Dialog from '@/components/Dialog.vue';
import logo from '@/assets/New Logo.png';
import {nearbyEvents} from "@/utils/api";

export default {
  components: {FullCalendar, Dialog},
  data() {
    return {
      logo: logo,
      selectedDate: null,
      selectedEvents: [],
      loading: false,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: [],
        dateClick: this.handleDateClick,
        datesSet: this.handleDatesSet,
      },
      latitude: "",
      longitude: "",
      geoReady: false,
    };
  },
  async mounted() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.geoReady = true;

          await this.$nextTick();  // wait for FullCalendar to mount

          const calendarApi = this.$refs.fullCalendar.getApi();
          const view = calendarApi.view;

          await this.handleDatesSet({
            startStr: view.currentStart.toISOString(),
            endStr: view.currentEnd.toISOString()
          });
        },
        (error) => {
          console.error("Location error:", error);
        }
    );
  },
  methods: {
    handleDateClick(info) {
      const calendarApi = this.$refs.fullCalendar.getApi();
      const eventsOnDay = calendarApi.getEvents().filter(
          event => event.startStr === info.dateStr
      );

      this.selectedDate = info.dateStr;
      this.selectedEvents = eventsOnDay.map(e => ({
        id: e.id,
        title: e.title,
        location: e.extendedProps.location,
        link: e.extendedProps.link,
      }));
    },
    async handleDatesSet(info) {
      if (!this.geoReady) return;

      this.loading = true;
      const startDate = info.startStr;
      const endDate = info.endStr;

      const response = await nearbyEvents(this.latitude, this.longitude, startDate, endDate);
      console.log("Fetched events:", response);

      const calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.removeAllEvents(); // clear old events

      calendarApi.addEventSource(
          response.map((event, i) => ({
            id: event.id || i,
            title: event.name,
            start: event.dates?.start?.localDate,
            location: event._embedded?.venues?.[0]?.name || 'Unknown venue',
            link: event.url
          }))
      );
      this.loading = false;
    },
  }
};
</script>

<style scoped>
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
</style>
