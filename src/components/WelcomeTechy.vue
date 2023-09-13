<template>
  <div class="md:flex justify-center h-screen items-center md:px-6">
    <div class="grid md:grid-cols-2 px-4">
      <div class="p-4 md:p-0.5">
        <img :src="imageSrc" />
      </div>
      <div class="text-center md:text-left place-self-center">
        <h1
          class="md:pb-10 pb-4 md:text-2xl text-lg text-center md:text-left font-extrabold font-serif text-yellow-600"
        >
          {{ HighlightMsg }}
        </h1>
        <h3
          class="md:pb-10 pb-4 md:text-xl text-sm text-center md:text-left font-extrabold font-serif text-yellow-600 text-wrap"
        >
          {{ message }}
        </h3>

        <button
          class="bg-yellow-500 hover:bg-yellow-700 rounded py-4 px-10 md:px-20 text-white text-lg font-bold capitalize"
          @click="onContinueClick"
        >
          <span class="">{{ state.buttonText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

const HighlightMsg = ref(
  "Meet TechQuest!: A Free Gamified Tool to Unleash Your Skills and Find Your Dream Tech Career!"
);
const message = ref(
  "Here the tool will assess your skills and preferences through a series of mini-games "
);

const state = reactive({
  image: "OneLogo",
  buttonText: "CONTINUE",
});

const imageSrc = computed(() => {
  return `/${state.image}.jpg`;
});

const router = useRouter();

// Your original HTML string
const htmlString =
  '<ol type="1">' +
  "<li>Fill in A Survey</li>" +
  "<li>Play Some games</li>" +
  "<li>Receive your total Score with an analysis of your skills and get recommendation</li>" +
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
    message.value = extractedText;
    HighlightMsg.value = "Your journey will take place in 3 phases ";
    state.buttonText = "Begin Survey";
  } else if (state.buttonText === "Begin Survey") {
    router.push("/survey");
  }
}
</script>

<style>
h3 {
  white-space: pre;
  text-wrap: wrap;
  list-style-type: none;
}

li::before {
  content: counter(item);
  counter-increment: item;
  border: 1px solid black;
}
</style>
