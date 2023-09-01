<template>
  <div class="game-container text-center">
    <h2 class="menu-title font-bold text-2xl pt-2 text-yellow-600">
      Word Scramble!
    </h2>
    <div class="text-center p-4">
      <img
        class="h-72 w-72 m-auto"
        src="../assets/word_scramble_logo.jpg"
        alt="logo"
      />
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
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes slidein {
  from {
    margin-left: -40%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>
