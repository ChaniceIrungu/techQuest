<template>
  <div class="game-container h-screen max-w-md mx-auto text-center">
    <h2 class="menu-title font-bold text-2xl pt-2 text-yellow-600">
      Word Scramble!
    </h2>
    <div class="text-center p-4">
      <img class="h-72 w-72 m-auto" src="/word_scramble_logo.jpg" alt="logo" />
    </div>

    <ol class="options">
      <li>
        <button
          class="check-word bg-yellow-500 hover:bg-yellow-700 rounded py-4 px-20 text-white text-lg font-bold capitalize"
          @click="$emit('init-game')"
        >
          Play
        </button>
      </li>
      <!-- <li>
        <button class="btn" @click="resumeGame">Resume</button>
      </li> -->

      <!-- on pause to quit -->
      <!-- <li v-if="isPaused">
        <button class="btn" @click="quitGame">Quit Game</button>
      </li> -->
    </ol>
  </div>
</template>
<script setup>
import Store from "../store/index.js";
</script>
<style>
.menu-title {
  animation-duration: 2s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
/* Two colors only */
/* @keyframes slidein {
  from {
    opacity: 1;
  }

  to {
    color: red;
    opacity: 0.8;
  }
} */
@keyframes slidein {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
    color: red; /* Change to red color halfway through */
  }

  100% {
    opacity: 1;
    color: blue; /* Return to green color at the end */
  }
}
</style>
