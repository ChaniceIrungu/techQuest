<template>
  <div class="px-4">
    <div v-if="!showEndOfGame">
      <!-- display the timer and progress bar -->
      <div class="mt-2" id="progress" :style="{ width: progressWidth }"></div>

      <div class="flex flex-row justify-between">
        <!-- Display Health -->
        <div class="font-bold text-base inline-flex md:pl-4">
          <span class="md:pr-4">Health :</span>
          <span v-for="heart in hearts" :key="heart">
            <img class="h-6 w-6" src="/heart.png" />
          </span>
        </div>

        <!-- Score -->
        <div class="font-bold text-base">Score : {{ score }}</div>
      </div>

      <div class="flex flex-col justify-center items-center">
        <!-- display the Statements here-->
        <div class="pb-6 pt-4">
          <h3 id="statement-container" class="text-xl text-center font-bold">
            {{ currentStatement }}
          </h3>
        </div>

        <!-- Display the Shape -->
        <div id="shape-container">
          <svg width="177" height="177" viewBox="0 0 177 177" fill="none">
            <circle
              v-if="currentShape === 'circle'"
              cx="88.5"
              cy="88.5"
              r="81.5"
              :stroke="currentColor"
              stroke-width="14"
            />

            <rect
              v-else-if="currentShape === 'square'"
              x="7"
              y="7"
              width="163"
              height="163"
              :fill="currentColor"
              :stroke="currentColor"
              stroke-width="14"
            />

            <polygon
              v-else-if="currentShape === 'triangle'"
              points="88.5 7 7 170 170 170"
              :stroke="currentColor"
              stroke-width="14"
            />
          </svg>
        </div>

        <!-- show true button on the right -->
        <div
          v-show="!showTrueButtonFirst"
          class="grid gap-20 md:gap-32 grid-cols-2 mt-10 md:mt-16"
        >
          <!-- false button left -->
          <div class="h-24 w-24">
            <img
              ref="false-button"
              src="../assets/False.png"
              @click="checkAnswer('false')"
              class="h-full"
            />
          </div>
          <!-- true button on right side -->
          <div class="h-24 w-24">
            <img
              src="../assets/True.png"
              ref="true-button"
              @click="checkAnswer('true')"
            />
          </div>
        </div>

        <!-- show true button on the left -->
        <div
          v-show="showTrueButtonFirst"
          class="grid gap-20 md:gap-32 grid-cols-2 mt-10 md:mt-16"
        >
          <!-- true button on left side -->
          <div class="h-24 w-24">
            <img
              src="../assets/True.png"
              ref="true-button"
              @click="checkAnswer('true')"
            />
          </div>
          <!-- false button right -->
          <div class="h-24 w-24">
            <img
              ref="false-button"
              src="../assets/False.png"
              @click="checkAnswer('false')"
              class="h-full"
            />
          </div>
        </div>
      </div>
    </div>
    <endOfGame
      v-if="showEndOfGame"
      :score="score"
      :correct="correct"
      :wrong="wrong"
      :feebackMessage="feebackMessage"
    />
  </div>
</template>
<script setup>
import { ref, reactive, computed, onUnmounted, onMounted } from "vue";
import endOfGame from "../components/shapesMemory/endOfGame.vue";

const progressWidth = ref(null);
const lives = ref(3);
const score = ref(0);
const correct = ref(0);
const wrong = ref(0);
const showTrueButtonFirst = ref(false);
const showEndOfGame = ref(false);
const feebackMessage = ref("");

const shapes = ["circle", "square", "triangle"];
const colors = ["red", "blue", "green", "purple", "orange"];

const statementTemplates = [
  "It's a {color} {Shape}",
  "It's not a {color} {Shape}",
  "This is definitely not a {color} {Shape}",
  "I'm pretty sure it a {color} {Shape}",
];
let timer;
const timeLeft = ref(45); // start the timer at 60 seconds
const duration = ref(45);

// Use a computed property to generate the hearts array based on the number of lives
const hearts = computed(() => {
  const result = [];
  for (let i = 0; i < lives.value; i++) {
    result.push(i);
  }
  return result;
});

const currentShape = ref(null || "circle");
const currentColor = ref(null || "green");
const statementShape = ref(null || "square");
const statementColor = ref(null || "green");
// Computed property to generate a random statement
const currentStatement = computed(() => {
  const template =
    statementTemplates[getRandomIndex(statementTemplates.length)];
  return template
    .replace("{color}", statementColor.value)
    .replace("{Shape}", statementShape.value);
});

onMounted(() => {
  generateShapes();
  startTimer();
});

// method to create the shapes
const generateShapes = () => {
  // randomize color and shape creation
  currentColor.value = colors[getRandomIndex(colors.length)];
  shuffle(shapes);
  currentShape.value = shapes[getRandomIndex(shapes.length)];
  //   console.log("current color", currentColor.value);
  //   console.log("current shape", currentShape.value);
  generateStatement();
};

const generateStatement = () => {
  //select a shape and color that match the current shape and color
  // with a probability of 1/3
  if (Math.random() < 1 / 4) {
    statementShape.value = currentShape.value;
    statementColor.value = currentColor.value;
  } else {
    // Otherwise, randomly select a shape and color as before
    statementShape.value = shapes[getRandomIndex(shapes.length)];
    statementColor.value = colors[getRandomIndex(colors.length)];
  }

  //   console.log("currentstatement", currentStatement.value);
  //   console.log("statement shape", statementShape.value);
};

const checkAnswer = (response) => {
  // Check whether the user tapped true or false
  const clickedTrue = response === "true";
  const clickedFalse = response === "false";

  // Check whether the statement and current shape match
  const isMatch =
    statementColor.value === currentColor.value &&
    statementShape.value === currentShape.value;

  // Check whether the current statement is negative or positive
  const isNegative = /not/i.test(currentStatement.value);

  // player tapped true
  if (clickedTrue && isNegative) {
    if (isMatch) {
      // The user clicked true, the statement is negative, and the color and shape match (correct answer)
      //   console.log("Incorrect (should have clicked false)");
      updateScore("wrong");
    } else {
      console.log("true,  Correct");
      updateScore("right");
    }
  }
  if (clickedTrue && !isNegative) {
    if (isMatch) {
      // The user clicked true, the statement is positive, and the color and shape match (correct answer)
      //   console.log("true,  Correct");
      updateScore("right");
    } else {
      //   console.log("Incorrect (should have clicked false)");
      updateScore("wrong");
    }
  }

  // player tapped false
  if (clickedFalse && isNegative) {
    if (isMatch) {
      // The user clicked false, the statement is negative, and the color and shape match (correct answer)
      //   console.log("true,  Correct");
      updateScore("right");
    } else {
      console.log("Incorrect (should have clicked true)");
      updateScore("wrong");
    }
  }
  if (clickedFalse && !isNegative) {
    if (isMatch) {
      // The user clicked true, the statement is positive, and the color and shape match (correct answer)
      //   console.log("Incorrect (should have clicked true)");
      updateScore("wrong");
    } else {
      //   console.log("true,  Correct");
      updateScore("right");
    }
  }

  interchangeButtons();
  generateShapes();
};

const interchangeButtons = () => {
  // Randomly decide whether to show the True button first or with 60% chance
  // 40% chance buttons will not be swapped
  showTrueButtonFirst.value = Math.random() < 0.6;
};

// Function to decrement lives when the player fails
const reduceLives = () => {
  if (lives.value > 0) {
    lives.value -= 1;
  }

  if (hearts.value.length === 0) {
    feebackMessage.value = " OOPs! You Lost All Your Lives!";
    showEndOfGame.value = true;
  }
};

const updateScore = (result) => {
  if (result === "right") {
    score.value += 50;
    correct.value++;
  } else {
    score.value -= 40;
    wrong.value++;
    reduceLives();
  }
};

// method to start the timer
const startTimer = () => {
  timer = setInterval(() => {
    timeLeft.value--; // decrease the time left by 1 second

    // update the progress bar
    progressWidth.value = (timeLeft.value / duration.value) * 100 + "%";

    if (timeLeft.value <= 0) {
      clearInterval(timer); // stop the timer when it reaches 0
      console.log("times up");
      feebackMessage.value = "Times up!";
      showEndOfGame.value = true;
    }
  }, 1000); // run the timer every 1000 milliseconds (1 second)
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
// Function to get a random index for statementTemplates
const getRandomIndex = (item) => {
  return Math.floor(Math.random() * item);
};
</script>

<style>
#progress {
  height: 15px;
  background-color: lightslategrey;
  margin-bottom: 20px;
}
</style>
