import { createApp } from 'vue'
import App from '@/App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import MasterLayout2 from "@/layouts/MasterLayout2.vue";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/SignUp.vue";
import Messages from "@/components/Messages.vue";
import Notifications from "@/components/Notifications.vue";
import NewMessage from "@/components/NewMessage.vue";
import MessageDetail from "@/components/MessageDetail.vue";
import ContactUs from "@/components/ContactUs.vue";
import InstrumentRecommendation from "@/components/InstrumentRecommendationPage.vue";
import ProfileCompletionForm from "@/components/ProfileCompletionForm";
import More from "@/components/More";
import InstrumentQuestionWizard from "@/components/InstrumentQuestionWizard";
import MatchingQuestions from "@/components/MatchingQuestions";
import ProfilePage from "@/components/ProfilePage"
import Events from "@/components/EventsPage";
import StorePage from "@/components/StorePage";
import Learning from "@/components/Learning";
import PremiumPage from "@/components/PremiumPage";

// Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: MasterLayout2,
        children: [
            {
                path: "login",
                name: "Login",
                component: Login,
            },
            {
                path: "signup",
                name: "Signup",
                component: Signup,
            },
            {
                path: "",
                name: "Home",
                component: Home,
                meta: { requiresAuth: true },
            },
            {
                path: "messages",
                name: "Messages",
                component: Messages,
                meta: { requiresAuth: true },
            },
            {
                path: "notifications",
                name: "Notifications",
                component: Notifications,
                meta: { requiresAuth: true },
            },
            {
                path: "new-message/:username?",
                name: "NewMessage",
                component: NewMessage,
                meta: { requiresAuth: true },
            },
            {
                path: "message-detail",
                name: "MessageDetail",
                component: MessageDetail,
                meta: { requiresAuth: true },
            },
            {
                path: "contact-us",
                name: "ContactUs",
                component: ContactUs,
                meta: { requiresAuth: true },
            },
            {
                path: "instrument-recommendation",
                name: "InstrumentRecommendation",
                component: InstrumentRecommendation,
                meta: { requiresAuth: true },
            },
            {
                path: "instrument-question-wizard",
                name: "InstrumentQuestionWizard",
                component: InstrumentQuestionWizard,
                meta: { requiresAuth: true },
            },
            {
                path: "profile",
                name: "Profile",
                component: ProfileCompletionForm,
                meta: { requiresAuth: true },
            },
            {
                path: "more",
                name: "More",
                component: More,
                meta: { requiresAuth: true },
            },
            {
                path: "matching-questions",
                name: "MatchingQuestions",
                component: MatchingQuestions,
                meta: { requiresAuth: true },
            },
            {
                path: '/profile/:username',
                name: 'user-profile',
                component: ProfilePage,
                meta: { requiresAuth: true },
            },
            {
                path: '/events',
                name: 'EventsPage',
                component: Events,
                meta: { requiresAuth: true },
            },
            {
                path: '/store',
                name: 'StorePage',
                component: StorePage,
                meta: { requiresAuth: true },
            },
            {
                path: '/learning',
                name: 'Learning',
                component: Learning,
                meta: { requiresAuth: true },
            },
            {
                path: '/premium',
                name: 'Premium',
                component: PremiumPage,
                meta: { requiresAuth: true },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("access_token");
    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

createApp(App).use(router).mount('#app')

export default router;
