<template>
  <div class="md:min-h-screen md:py-8 py-2">
    <div class="container mx-auto px-4">
      <h3 class="md:text-2xl text-xl font-semibold mb-4 text-center text-white">
        Select all the colors that match the given website theme.
      </h3>
      <h3 class="md:text-base text-sm mb-4 text-center text-white">
        Click <span class="font-semibold">SUBMIT</span> once satisfied with
        atleast three of your answers
      </h3>

      <!-- game board -->
      <div
        class="game-board bg-white rounded-lg md:p-6 p-4 shadow-lg tracking-wide text-center"
      >
        <h2>
          Design a color palette for:
          <span
            class="font-bold underline decoration-indigo-500 decoration-dotted text-xl"
            >{{ currentTheme?.name }}</span
          >
        </h2>
        <div
          class="target-color mt-4 p-4 rounded-lg text-white font-semibold tracking wide"
          :style="{ backgroundColor: targetColorClass }"
        >
          Theme Color
        </div>
      </div>
      <!-- Feedback -->
      <div class="feedback mt-4 bg-gray-200 p-1" v-if="feedbackMessage">
        <p class="font-semibold text-lg" :class="feedbackColor">
          {{ feedbackMessage }}
        </p>
      </div>
      <!-- color pallete section -->
      <div
        class="color-palette mt-6 grid grid-cols-3 gap-4 p-2 md:p-4 bg-gray-200 rounded-md"
      >
        <div
          v-for="color in allPaletteOptions"
          :key="color"
          class="palette-color p-4 rounded-lg cursor-pointer h-12 w-30 border border-black font-semi-bold text-black"
          :style="{ backgroundColor: color }"
          @click="clickedColor(color)"
        >
          {{ selectedColors.includes(color) ? "Selected" : "" }}
        </div>
      </div>
      <div class="flex justify-around mt-4">
        <cButton
          :disabled="!selectedColors.length"
          @click="checkAnswer"
          :buttonText="' Submit'"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import themes from "../store/questions.js";
import { useRouter } from "vue-router";
const router = useRouter();
import cButton from "./Button.vue";

const currentThemeIndex = ref(0);
const gameThemes = ref([]);
const selectedColors = ref([]);
const correct = ref(0);
const correctColor = ref(false);
const feedbackMessage = ref("");

onMounted(() => {
  // console.log(gameThemes.value);
});

const currentTheme = computed(() => {
  shuffleArray(themes);
  gameThemes.value = themes.slice(0, 4);
  return gameThemes.value && gameThemes.value[currentThemeIndex.value];
});

const targetColorClass = computed(() => {
  return currentTheme.value?.targetColor;
});

const feedbackColor = computed(() => {
  return correctColor.value ? "text-green-500" : "text-red-500";
});

const allPaletteOptions = computed(() => {
  // Merge correct and incorrect palette options and shuffle them
  const options = [
    ...currentTheme.value?.correctPaletteOptions.slice(0, 5),
    ...currentTheme.value?.incorrectPaletteOptions.slice(0, 3),
  ];

  shuffleArray(options);
  return options;
});

const clickedColor = (color) => {
  if (selectedColors.value.includes(color)) {
    // Deselect color if already selected
    selectedColors.value = selectedColors.value.filter((c) => c !== color);
  } else {
    // Select color
    selectedColors.value.push(color);
  }
};

const checkAnswer = () => {
  correctColor.value = false;
  const correctColors = currentTheme.value?.correctPaletteOptions;
  const incorrectColors = currentTheme.value?.incorrectPaletteOptions;

  const isCorrectPalette = selectedColors.value.every((color) =>
    correctColors.includes(color)
  );

  if (isCorrectPalette) {
    correctColor.value = true;
    if (selectedColors.value.length > 3) {
      correct.value++;

      feedbackMessage.value =
        "Great job! Your color palette matches the theme.";
    } else {
      feedbackMessage.value =
        "The palette colors are correct but there needs to be more than 3 colors.";
    }
  } else if (
    selectedColors.value.some((color) => incorrectColors.includes(color))
  ) {
    feedbackMessage.value =
      "Oops! Your color palette includes incorrect colors that do not match the theme.";
  } else {
    feedbackMessage.value =
      "Your color palette does not match the theme. Try again.";
  }

  setTimeout(() => {
    // Move to the next round after displaying feedback
    nextRound();
  }, 2000); // Delay for 2 seconds before moving to the next round
};

const nextRound = () => {
  // Reset the game state for the next round
  selectedColors.value = [];
  feedbackMessage.value = "";

  if (currentThemeIndex.value < gameThemes.value.length - 1) {
    // Increment the index to move to the next theme
    currentThemeIndex.value++;
  } else {
    // If at the last index, navigate to the game over page
    localStorage.setItem("paletteScore", pallettePercentage.value);
    router.push({ name: "tech-quest-end" });
    return; // Exit function to prevent further execution
  }

  // Wait for a brief period before moving to the next round
  setTimeout(() => {
    feedbackMessage.value = "";
  }, 2000);
};

const pallettePercentage = computed(() => {
  return Math.round((correct.value / 4) * 100);
});

// Function to shuffle an array randomly (Fisher-Yates shuffle algorithm)
const shuffleArray = (arr) => {
  var currIndex = arr.length;
  var tempValue;
  var randomIndex;
  while (currIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;
    tempValue = arr[currIndex];
    arr[currIndex] = arr[randomIndex];
    arr[randomIndex] = tempValue;
  }
  return arr;
};
</script>
