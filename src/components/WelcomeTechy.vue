<template>
  <div class="flex justify-center">
    <div class="p-4">
      <img :src="imageSrc" />
    </div>

    <div class="grid grid-cols place-items-center">
      <div class="text-center">
        <h1
          class="pb-10 text-2xl text-center font-extrabold font-serif text-yellow-600"
        >
          {{ message }}
        </h1>

        <button
          class="bg-yellow-500 hover:bg-yellow-700 rounded py-4 px-20 text-white text-lg font-bold capitalize"
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

const message = ref(
  "TechQuest: Unleash Your Skills and Find Your Dream Tech Career!"
);

const state = reactive({
  image: "OneLogo",
  buttonText: "CONTINUE",
});

const imageSrc = computed(() => {
  return `/src/assets/${state.image}.jpg`;
});

const router = useRouter();

function onContinueClick() {
  if (state.buttonText === "CONTINUE") {
    state.image = "plainLogo";
    message.value = "Complete the 2-minute Survey and Begin Your Journey!";
    state.buttonText = "Proceed";
  } else if (state.buttonText === "Proceed") {
    router.push("/survey");
  }
}
</script>

<style>
/* Add your styles here */
</style>
