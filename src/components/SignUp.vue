<template>
  <div class="flex flex-col items-center h-full bg-gray-100">

    <!-- Header (Same as Home Page, without Profile Button) -->
    <div class="relative w-full h-[25vh] flex flex-col justify-center items-center text-white">
      <!-- Pink Background Layer (Curved Border) -->
      <div class="absolute top-0 left-0 w-full h-full bg-[#B7372B]"
           style="clip-path: ellipse(115% 85% at center top); opacity: 30%"></div>

      <!-- Red Foreground Layer -->
      <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#C00000]"
           style="clip-path: ellipse(110% 80% at center top);">
        <!-- Logo -->
        <img :src="logo" alt="Logo" class="h-[35%] w-auto"/>
        <!-- App Name -->
        <span class="text-[3vh] modak mt-2">Archet</span>
      </div>
    </div>

    <!-- Sign-Up Form Container -->
    <div class="flex flex-col flex-grow w-full max-w-md p-8 bg-white">
      <!-- Sign-Up Form -->
      <form @submit.prevent="handleSignup" class="space-y-3">
        <!-- Email Field -->
        <div class="flex flex-col">
          <label for="email" class="text-sm font-semibold text-gray-700">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- Username Field -->
        <div class="flex flex-col">
          <label for="username" class="text-sm font-semibold text-gray-700">Username</label>
          <input
              type="text"
              id="username"
              v-model="username"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- Password Field -->
        <div class="flex flex-col">
          <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- Confirm Password Field -->
        <div class="flex flex-col">
          <label for="confirm-password" class="text-sm font-semibold text-gray-700">Confirm Password</label>
          <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <!-- Sign-Up Button -->
        <button
            type="submit"
            class="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all font-bold"
        >
          Sign Up
        </button>
      </form>

      <!-- Privacy & Terms -->
      <p class="text-sm text-gray-500 mt-4 text-center">
        By signing up, you agree to our
<!--        <button @click="showPrivacyPolicy" class="text-red-600 underline">Privacy Policy</button>-->
<!--        and-->
        <button @click="showTermsAndConditions" class="text-red-600 underline">Terms and Conditions</button>.
      </p>
      <!-- Already Have an Account? Login -->
      <div class="text-center mt-4">
        <p class="text-gray-600 text-sm">
          Already have an account?
          <router-link to="/login" class="text-red-600 underline">
            Login
          </router-link>
        </p>
      </div>
    </div>

    <!-- Privacy Policy Popup -->
<!--    <transition name="fade">-->
<!--      <div v-if="showPrivacyPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">-->
<!--        <div class="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">-->
<!--          <h3 class="text-xl font-bold mb-4">Privacy Policy</h3>-->
<!--          <p class="text-sm text-gray-600 mb-4">-->
<!--          </p>-->
<!--          <button @click="closePopups" class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">Close</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </transition>-->

    <!-- Terms and Conditions Popup -->
    <transition name="fade">
      <div v-if="showTermsPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
          <h3 class="text-xl font-bold mb-4">Terms and Conditions / Conditions générales</h3>
          <!-- Tabs -->
          <div class="flex space-x-4 mb-4">
            <button
                :class="currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-4 py-2 rounded"
                @click="currentLang = 'en'"
            >
              English
            </button>
            <button
                :class="currentLang === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-4 py-2 rounded"
                @click="currentLang = 'fr'"
            >
              Français
            </button>
          </div>

          <div v-if="currentLang === 'en'" class="text-sm text-gray-700 space-y-3">
          <h1>English Version:</h1>
          <p><strong>1. Introduction</strong><br>
            Welcome to Tunify! These Terms and Conditions ("Terms") are a legally binding agreement between you ("User") and Tunify Inc. ("Company," "we," or "us"). These Terms govern your access to and use of the Tunify platform and services, including musician matchmaking and instrument recommendation tools. By accessing or using Tunify, you agree to these Terms. If you do not agree, you must stop using Tunify.</p>

          <p><strong>2. Language Clause</strong><br>
            In compliance with the Charter of the French Language, these Terms are provided in both English and French. In case of any discrepancy between the two versions, the French version shall prevail.</p>

          <p><strong>3. Eligibility</strong><br>
            You must be at least 13 years old to use Tunify. Users under 18 years of age require explicit parental or guardian consent. Use of Tunify is limited to jurisdictions where our services are legal and permitted.</p>

          <p><strong>4. Privacy and Data Collection</strong><br>
            Tunify is committed to protecting your privacy. All personal data collected is handled in compliance with relevant privacy laws. We collect only the data necessary to improve your experience and provide our services.</p>

          <strong>5. Services</strong><br>
            Tunify offers two primary services:
          <ul class="list-disc list-inside ml-4">
            <li>Musician Matchmaking: Connecting users based on musical preferences, skills, and goals.</li>
            <li>Instrument Recommendations: Personalized instrument suggestions tailored to user inputs.</li>
          </ul>

          <p><strong>6. Web Scraping: Our Practices and User Obligations</strong><br>
            <strong>6.1. Our Practices:</strong> We may use publicly available data and ensure legal compliance.<br>
            <strong>6.2. User Restrictions:</strong> Users may not scrape or collect data from Tunify without prior authorization. Violations may lead to suspension or legal action.
          </p>

          <p><strong>7. User Accounts</strong><br>
            Users must provide accurate information and keep their credentials secure. We are not responsible for unauthorized access caused by user negligence.</p>

          <p><strong>8. Intellectual Property</strong><br>
            All content and features on Tunify are our property. Unauthorized reproduction or use is prohibited.</p>

          <p><strong>9. Prohibited Activities</strong><br>
            Misuse of the platform, including misrepresentation, unlawful use, or technical circumvention, is strictly prohibited.</p>

          <p><strong>10. Limitation of Liability</strong><br>
            Tunify is provided “as is” without guarantees. We are not liable for damages from misuse or interruptions.</p>

          <p><strong>11. Consumer Rights</strong><br>
            Users are entitled to clear and fair terms under Quebec law.</p>

          <p><strong>12. Amendments</strong><br>
            We may update these Terms at any time. Continued use implies acceptance.</p>

          <p><strong>13. Governing Law and Dispute Resolution</strong><br>
            These Terms are governed by the laws of Quebec and Canada.</p>

          <p><strong>14. Contact Information</strong><br>
            Email: <a href="mailto:support@tunify.com" class="text-blue-600 underline">support@tunify.com</a><br>
            </p>
        </div>
          <div v-if="currentLang === 'fr'" class="text-sm text-gray-700 space-y-3">
            <p><strong>1. Introduction</strong><br>
              Bienvenue sur Tunify ! Ces Termes et Conditions ("Conditions") constituent un accord juridiquement contraignant entre vous ("Utilisateur") et Tunify Inc. ("Société", "nous"). Ces Conditions régissent votre accès et votre utilisation de la plateforme Tunify et de ses services, y compris le jumelage musical et les recommandations d'instruments. En accédant à Tunify ou en l'utilisant, vous acceptez ces Conditions. Si vous n’acceptez pas, veuillez cesser d’utiliser Tunify.</p>

            <p><strong>2. Clause linguistique</strong><br>
              Conformément à la Charte de la langue française, ces Conditions sont fournies en anglais et en français. En cas de divergence, la version française prévaut.</p>

            <p><strong>3. Admissibilité</strong><br>
              Vous devez avoir au moins 13 ans pour utiliser Tunify. Les utilisateurs de moins de 18 ans doivent obtenir le consentement explicite d’un parent ou tuteur. Tunify ne peut être utilisé que dans les juridictions où nos services sont légaux.</p>

            <p><strong>4. Vie privée et collecte de données</strong><br>
              Tunify s'engage à protéger votre vie privée. Toutes les données personnelles sont traitées conformément aux lois en vigueur. Nous collectons uniquement les données nécessaires pour améliorer votre expérience.</p>

            <strong>5. Services</strong><br>
              Tunify offre deux services principaux :
            <ul class="list-disc list-inside ml-4">
              <li>Jumelage musical : Connexion des utilisateurs selon leurs goûts, compétences et objectifs musicaux.</li>
              <li>Recommandations d’instruments : Suggestions personnalisées selon vos préférences.</li>
            </ul>

            <p><strong>6. Collecte de données (Web Scraping) : Nos pratiques et vos obligations</strong><br>
              <strong>6.1. Nos pratiques :</strong> Nous utilisons uniquement des données disponibles publiquement et dans le respect des lois.<br>
              <strong>6.2. Restrictions utilisateur :</strong> Il est interdit de collecter des données sur Tunify sans autorisation préalable. Les contrevenants pourront faire l’objet de sanctions ou de poursuites.
            </p>

            <p><strong>7. Comptes utilisateurs</strong><br>
              Vous devez fournir des informations exactes et protéger vos identifiants. Nous ne sommes pas responsables des accès non autorisés dus à votre négligence.</p>

            <p><strong>8. Propriété intellectuelle</strong><br>
              Tous les contenus présents sur Tunify sont notre propriété exclusive. Toute reproduction ou utilisation non autorisée est interdite.</p>

            <p><strong>9. Activités interdites</strong><br>
              Toute utilisation abusive de la plateforme est strictement interdite, y compris la fraude, l’usage illégal ou la manipulation technique.</p>

            <p><strong>10. Limitation de responsabilité</strong><br>
              Tunify est fourni “tel quel”, sans garanties. Nous ne sommes pas responsables des dommages causés par une mauvaise utilisation ou des interruptions.</p>

            <p><strong>11. Droits des consommateurs</strong><br>
              Les utilisateurs bénéficient de conditions claires et équitables conformément à la loi québécoise.</p>

            <p><strong>12. Modifications</strong><br>
              Nous pouvons modifier ces Conditions à tout moment. Votre utilisation continue vaut acceptation des nouvelles conditions.</p>

            <p><strong>13. Droit applicable et résolution des litiges</strong><br>
              Ces Conditions sont régies par les lois du Québec et du Canada.</p>

            <p><strong>14. Contact</strong><br>
              Courriel : <a href="mailto:support@tunify.com" class="text-blue-600 underline">support@tunify.com</a><br>
              </p>
          </div>

          <button @click="closePopups" class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">Close</button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import axios from "axios";
import logo from "@/assets/New Logo.png";

export default {
  name: "SignupPage",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      showPrivacyPopup: false,
      showTermsPopup: false,
      currentLang: 'en',
      logo: logo,
    };
  },
  methods: {
    async handleSignup() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const VUE_APP_API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
        const response = await axios.post(`${VUE_APP_API_BASE_URL}api/user/register/`, {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);

        this.$router.push("/login");
      } catch (err) {
        // Show detailed backend validation errors
        if (err.response && err.response.data) {
          const errors = err.response.data;
          let errorMessages = [];

          for (const field in errors) {
            const fieldErrors = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
            fieldErrors.forEach(msg => {
              errorMessages.push(`${field}: ${msg}`);
            });
          }

          alert("Registration failed:\n" + errorMessages.join("\n"));
        } else {
          alert("Registration failed! Please try again.");
        }
      }
    },
    showPrivacyPolicy() {
      this.showPrivacyPopup = true;
    },
    showTermsAndConditions() {
      this.showTermsPopup = true;
    },
    closePopups() {
      this.showPrivacyPopup = false;
      this.showTermsPopup = false;
    },
  },
};
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Fade Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
