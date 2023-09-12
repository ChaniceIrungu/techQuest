<template>
  <div class="md:flex justify-center">
    <div class="grid md:grid-cols-2 place-items-center px-4">
      <div class="p-4">
        <img :src="imageSrc" />
      </div>
      <div class="text-center">
        <h1
          class="md:pb-10 pb-4 md:text-2xl text-lg text-center font-extrabold font-serif text-yellow-600"
        >
          {{ HighlightMsg }}
        </h1>
        <h3
          class="md:pb-10 pb-4 md:text-xl text-sm text-center font-extrabold font-serif text-yellow-600"
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

function onContinueClick() {
  if (state.buttonText === "CONTINUE") {
    state.image = "plainLogo";
    message.value =
      "Complete the 2-minute Survey, Play Some Games, and Begin Your Journey!";
    state.buttonText = "Proceed";
  } else if (state.buttonText === "Proceed") {
    router.push("/survey");
  }
}
</script>

<style>
/* Add your styles here */
</style>
