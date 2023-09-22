<template>
  <div
    class="flex flex-col items-center justify-center md:p-0.5 px-4 md:justify-center mx-auto"
  >
    <h1 class="pb-2 text-2xl text-center font-extrabold font-serif text-black">
      Thanks you for your reponses
      <strong class="text-yellow-600 capitalize">{{ userName }}.</strong>
    </h1>
    <h1
      class="p-2 text-xl text-center font-extrabold font-serif text-black-600"
    >
      Let the Games Begin!
    </h1>

    <h1
      class="p-1 text-xl text-center font-extrabold font-serif text-black-600"
    >
      Riddle Challenge:
    </h1>

    <div class="text-center">
      <div class="flex justify-center">
        <img class="" src="/riddle.jpg" />
      </div>

      <div class="flex flex-col items-center pt-2">
        <p
          class="text-base md:text-xl text-center md:text-left font-extrabold font-serif text-yellow-600"
        >
          For this challenge you will receive a bunch of cards.
        </p>
        <p
          class="text-base md:text-xl text-center md:text-left font-extrabold font-serif text-yellow-600"
        >
          Flip the card to reveal the riddle.
        </p>
        <p
          class="text-base md:text-xl text-center md:text-left font-extrabold font-serif text-yellow-600"
        >
          There will be clues to guide you on your way.
        </p>
        <button
          class="bg-yellow-500 hover:bg-yellow-700 rounded mt-4 py-4 px-10 text-white text-lg font-bold capitalize"
        >
          <span class="" @click="showNextGame">START</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

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
