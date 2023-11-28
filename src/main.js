import "./assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Create a Pinia instance
const pinia = createPinia();

app.use(router);
// Use Pinia instance in the app
app.use(pinia);

app.mount("#app");
