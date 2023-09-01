<template>
  <div class="flex flex-col items-center px-4 tracking-wider">
    <h1
      class="pb-2 text-2xl text-center font-extrabold font-serif text-yellow-600"
    >
      Thanks you for your reponses
      <strong class="text-black">Chanice.</strong>
    </h1>
    <h1
      class="p-2 text-xl text-center font-extrabold font-serif text-yellow-600"
    >
      Let the Games Begin!
    </h1>

    <h1
      class="p-1 text-xl text-center font-extrabold font-serif text-black-600"
    >
      Riddle Challenge:
    </h1>

    <div class="grid grid-cols-2 place-items-center">
      <div class="">
        <img src="../assets/riddle.jpg" />
      </div>

      <div class="">
        <p class="text-xl text-left font-extrabold font-serif text-black-600">
          For this challenge you will receive a bunch of cards. You must solve
          the riddle on the card before time runs out. Flip the card to reveal
          the riddle. There will be clues to guide you on your way.
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
import { ref, computed } from "vue";
const imageSrc = ref("/src/assets/riddle.jpg");
const router = useRouter();
import { useRouter } from "vue-router";

const showNextGame = () => {
  // Perform any actions needed when finishing the survey
  // For example, save the survey responses or navigate to another page
  // In this case, we navigate to the "riddles" page
  router.push({ name: "scramble-view" });
};
</script>
