<template>
  <div class="md:flex justify-center h-screen items-center px-2 md:px-6">
    <div class="grid md:grid-cols-2 px-4">
      <div class="p-4 md:p-0.5 place-self-center">
        <img class="h-96 w-auto" :src="imageSrc" />
      </div>
      <div class="text-center md:text-left place-self-center flex-1">
        <h1
          class="md:pb-10 pb-4 md:text-2xl text-lg text-center md:text-left font-extrabold font-serif text-fuchsia-600 break-words flex-1"
        >
          {{ HighlightMsg }}
        </h1>
        <h3
          v-if="!message2"
          class="md:pb-10 pb-4 md:text-xl text-sm text-center md:text-left font-extrabold font-serif text-blue-600 text-wrap break-words flex-1"
        >
          {{ message }}
        </h3>
        <div
          v-if="message2"
          class="md:pb-10 pb-4 md:text-xl text-sm font-extrabold font-serif text-blue-600 text-wrap break-words"
        >
          <ol class="list-decimal text-left">
            <li>Fill in a survey</li>
            <li>Play some games</li>
            <li>
              Receive your total score, an analysis of your skills and a tech
              career recommendations.
            </li>
          </ol>
        </div>
        <cButton :buttonText="state.buttonText" @click="onContinueClick" />

        <!-- <button
          class="bg-blue-500 hover:bg-blue-700 rounded py-4 px-10 md:px-20 text-white text-lg font-bold capitalize"
          @click="onContinueClick"
        >
          <span class="">{{ state.buttonText }}</span>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import cButton from "./Button.vue";
const router = useRouter();

const HighlightMsg = ref(
  "Meet TechQuest!: A Free Gamified Tool to Unleash Your Skills and Find Your Dream Tech Career!"
);
const message2 = ref(false);
const message = ref(
  "Here the tool will assess your skills and preferences through a series of mini-games. "
);

const state = reactive({
  image: "OneLogo2",
  buttonText: "CONTINUE",
});

const imageSrc = computed(() => {
  return `/${state.image}.jpg`;
});

// Your original HTML string
const htmlString =
  '<ol type="1">' +
  "<li>Fill in a survey</li>" +
  "<li>Play some games</li>" +
  "<li>Receive your total score, an analysis of your skills and a tech career recommendations.</li>" +
  "</ol>";

// Create a temporary element to parse the HTML
const tempElement = document.createElement("div");
tempElement.innerHTML = htmlString;

// Get all the text content from the list items and number them
const listItems = tempElement.querySelectorAll("li");
let extractedText = "";

listItems.forEach((li, index) => {
  extractedText += `${index + 1}. ${li.textContent}\r\n`;
});

function onContinueClick() {
  if (state.buttonText === "CONTINUE") {
    state.image = "plainLogo";
    HighlightMsg.value = "Your journey will take place in 3 phases ";
    message2.value = true;
    state.buttonText = "Begin Survey";
  } else if (state.buttonText === "Begin Survey") {
    router.push("/survey");
  }
}
</script>

<style>
h3 {
  /* white-space: pre; */
  /* text-wrap: wrap; */
  /* list-style-type: none; */
}
</style>
