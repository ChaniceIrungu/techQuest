<template>
  <div
    class="flex flex-col items-center justify-center md:p-0.5 px-4 md:justify-center mx-auto"
  >
    <h1 class="pb-2 text-2xl text-center font-extrabold font-serif text-white">
      Thanks you for your reponses
      <strong class="text-sky capitalize">{{ userName }}.</strong>
    </h1>
    <h1 class="p-2 text-xl text-center font-extrabold text-white">
      Let the Games Begin!
    </h1>

    <h1 class="p-1 text-xl text-center font-extrabold text-white">
      Riddle Challenge:
    </h1>

    <div class="text-center">
      <div class="flex justify-center">
        <img class="" src="/riddle.jpg" />
      </div>

      <div class="flex flex-col items-center pt-2">
        <p
          class="text-base md:text-lg text-center md:text-left font-semibold text-white"
        >
          For this challenge you will receive a bunch of cards.
        </p>
        <p
          class="text-base md:text-lg text-center md:text-left font-semibold text-white"
        >
          Flip the card to reveal the riddle.
        </p>
        <p
          class="text-base md:text-lg text-center md:text-left font-semibold text-white"
        >
          There will be clues to guide you on your way.
        </p>

        <cButton
          :buttonText="'START'"
          @click="showNextGame"
          class="mt-4 py-4"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import cButton from "../components/Button.vue";

const router = useRouter();
const userName = ref("Human");
const imageSrc = ref("/riddle.jpg");

onMounted(async () => {
  userName.value = localStorage.getItem("name");
  console.log(userName.value);
});

const showNextGame = () => {
  // Perform any actions needed when finishing the survey
  // For example, save the survey responses or navigate to another page
  // In this case, we navigate to the "riddles" page
  router.push({ name: "riddles-1" });
};
</script>
