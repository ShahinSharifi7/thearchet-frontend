import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './main.css';
import FontAwesomeIcon from './plugins/fontawesome';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');