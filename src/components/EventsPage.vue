<template>
  <div class="h-full flex flex-col items-center overflow-hidden font-sans text-gray-800 tracking-wide">
    <!-- Header -->
    <div class="flex justify-center items-center h-[10vh] w-full mx-1"
         style="background-color: #C00000; color: white">
      <img :src="logo" alt="Logo" class="h-[80%] w-auto mx-1"/>
      <span class="text-[3vh] modak">Archet</span>
    </div>

    <div class="h-full w-full flex flex-col items-center p-4">
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
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: [
          // {
          //   id: 1,
          //   title: 'Edith Piaf',
          //   start: '2025-03-20',
          //   location: 'Le Balcon - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/edith-piaf'
          // },
          // {
          //   id: 2,
          //   title: 'Maruja (18+ Event)',
          //   start: '2025-03-21',
          //   location: 'Bar Le Ritz PDB - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/maruja-(18+)'
          // },
          // {
          //   id: 3,
          //   title: 'Jelly Roll',
          //   start: '2025-03-25',
          //   location: 'Place Bell - Laval QC',
          //   link: 'https://www.ticketsonsale.com/tickets/jelly-roll'
          // },
          // {
          //   id: 4,
          //   title: 'Nate Smith',
          //   start: '2025-03-27',
          //   location: 'MTELUS - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/nate-smith'
          // },
          // {
          //   id: 5,
          //   title: 'Kylie Minogue',
          //   start: '2025-03-30',
          //   location: 'Bell Centre - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/kylie-minogue'
          // },
          // {
          //   id: 6,
          //   title: 'J Balvin',
          //   start: '2025-04-07',
          //   location: 'Place Des Arts - Salle Wilfrid Pelletier - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/j-balvin-place-bell-laval-4-7-2025-5366905'
          // },
          // {
          //   id: 7,
          //   title: 'Elderbrook',
          //   start: '2025-04-26',
          //   location: 'MTELUS - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/elderbrook-mtelus-montreal-4-26-2025-5359927'
          // },
          // {
          //   id: 8,
          //   title: 'Brit Floyd',
          //   start: '2025-04-16',
          //   location: 'Place Des Arts - Salle Wilfrid Pelletier - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/brit-floyd-place-des-arts-salle-wilfrid-pelletier-montreal-4-16-2025-5294660'
          // },
          // {
          //   id: 9,
          //   title: 'Hocus Pocus',
          //   start: '2025-04-24',
          //   location: 'Place Des Arts - Cinquieme Salle - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/hocus-pocus-place-des-arts-cinquieme-salle-montreal-4-24-2025-5085462'
          // },
          // {
          //   id: 10,
          //   title: 'Pouya',
          //   start: '2025-05-03',
          //   location: 'Club Soda - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/pouya-club-soda-montreal-5-3-2025-5558157'
          // },
          // {
          //   id: 11,
          //   title: 'Evan Hone',
          //   start: '2025-05-09',
          //   location: 'Le Studio TD - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/evan-honer-le-studio-td-montreal-5-9-2025-5399549'
          // },
          // {
          //   id: 12,
          //   title: 'Alessia Cara',
          //   start: '2025-05-14',
          //   location: 'MTELUS - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/alessia-cara-mtelus-montreal-5-14-2025-5564244'
          // },
          // {
          //   id: 13,
          //   title: 'Dean Lewis',
          //   start: '2025-05-17',
          //   location: 'Place Bell - Laval QC',
          //   link: 'https://www.ticketsonsale.com/tickets/dean-lewis-place-bell-laval-5-17-2025-5022710'
          // },
          // {
          //   id: 14,
          //   title: 'Shakira',
          //   start: '2025-05-20',
          //   location: 'Bell Centre - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/shakira-(rescheduled-from-12102024)-bell-centre-montreal-5-20-2025-4933904'
          // },
          // {
          //   id: 15,
          //   title: 'Jet',
          //   start: '2025-05-28',
          //   location: 'LOlympia Montreal - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/jet-lolympia-montreal-montreal-5-28-2025-5511935'
          // },
          // {
          //   id: 16,
          //   title: 'Barry Manilow',
          //   start: '2025-05-30',
          //   location: 'Bell Centre - Montreal QC',
          //   link: 'https://www.ticketsonsale.com/tickets/barry-manilow-bell-centre-montreal-5-30-2025-5423649'
          // }
        ],
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
    },
  }
};
</script>

<style scoped>
/* Custom styling to match your design */
</style>
