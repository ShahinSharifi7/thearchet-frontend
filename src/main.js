import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './main.css';
import FontAwesomeIcon from './plugins/fontawesome';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


const app = createApp(App);

// Google Ads Initialization/Refresh Function
function initializeAds() {
    if (window.adsbygoogle && window.adsbygoogle.length) {
        window.adsbygoogle.push({});
    }
}

// Trigger the ad initialization/refresh after each route change
router.afterEach( () => {
    initializeAds();
});

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');