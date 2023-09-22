<template>
  <div class="bg-gray-200 md:min-h-screen md:py-8 py-2">
    <div class="container mx-auto px-4">
      <h3 class="text-2xl font-semibold mb-4">
        Select all the colors that match the given website theme.
      </h3>

      <!-- game board -->
      <div
        class="game-board bg-white rounded-lg md:p-6 p-4 shadow-lg tracking-wide"
      >
        <h2>
          Design a color palette for:
          <span
            class="font-bold underline decoration-indigo-500 decoration-dotted text-xl"
            >{{ currentTheme.name }}</span
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
      <div class="feedback mt-4" v-if="feedbackMessage">
        <p class="font-semibold text-lg" :class="feedbackColor">
          {{ feedbackMessage }}
        </p>
      </div>
      <!-- color pallete section -->
      <div class="color-palette mt-6 grid grid-cols-3 gap-4">
        <div
          v-for="color in allPaletteOptions"
          :key="color"
          class="palette-color p-4 rounded-lg cursor-pointer h-12 w-30 border border-black font-semi-bold text-white"
          :style="{ backgroundColor: color }"
          @click="clickedColor(color)"
        >
          {{ selectedColors.includes(color) ? "Selected" : "" }}
        </div>
      </div>
      <div class="flex justify-around">
        <button
          :disabled="!selectedColors.length"
          class="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          @click="checkAnswer"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import themes from "../store/questions.js";
import { useRouter } from "vue-router";
const router = useRouter();

const currentThemeIndex = ref(0);
const selectedColors = ref([]);
const score = ref(0);
const correctColor = ref(false);
const feedbackMessage = ref("");

onMounted(() => {});

const currentTheme = computed(() => {
  shuffleArray(themes);
  return themes[currentThemeIndex.value];
});

const targetColorClass = computed(() => {
  return currentTheme.value.targetColor;
});
const feedbackColor = computed(() => {
  return correctColor.value ? "text-green-500" : "text-red-500";
});

const allPaletteOptions = computed(() => {
  // Merge correct and incorrect palette options and shuffle them
  const options = [
    ...currentTheme.value.correctPaletteOptions.slice(0, 5),
    ...currentTheme.value.incorrectPaletteOptions.slice(0, 3),
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
  const correctColors = currentTheme.value.correctPaletteOptions;
  const incorrectColors = currentTheme.value.incorrectPaletteOptions;

  const isCorrectPalette = selectedColors.value.every((color) =>
    correctColors.includes(color)
  );

  if (isCorrectPalette) {
    score.value++;
    correctColor.value = true;
    feedbackMessage.value = "Great job! Your color palette matches the theme!.";
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

  if (currentThemeIndex.value <= themes.length - 1) {
    // If not at the last index, move to the next theme
    currentThemeIndex.value++;
  }
  if (currentThemeIndex.value === themes.length) {
    // If at the last index, navigate to the game over page
    setTimeout(() => {
      // Move to the next round after displaying feedback
      router.push({ name: "tech-quest-end" });
    }, 2000);
  }
  feedbackMessage.value = "";
};

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