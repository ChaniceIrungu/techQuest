<template>
  <div
    class="flex flex-col items-center md:p-0.5 p-4 md:justify-center tracking-wider"
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

    <div class="grid md:grid-cols-2 gap-4 place-items-center">
      <div class="m-auto flex justify-center">
        <img class="w-1/2 md:w-full" src="/riddle.jpg" />
      </div>

      <div class="flex flex-col items-center">
        <p
          class="text-base md:text-xl text-center md:text-left font-extrabold font-serif text-yellow-600"
        >
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
