import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast, { POSITION } from 'vue-toastification';  // Correctly import the Toast module
import 'vue-toastification/dist/index.css';  // Make sure to import the Toast CSS
import 'semantic-ui-css/semantic.css';  // Import Semantic UI CSS for styling

const app = createApp(App);

// Set up Toastification plugin
app.use(router);  // Use the router
app.use(Toast, {
  position: POSITION.TOP_RIGHT,  // Optional: Set default position for your toasts
});

app.mount('#app');  // Mount the app
