<template>
  <div
    className="min-h-screen box-border 2xl:bg-white	md:flex md:flex-col items-center text-sm md:text-lg"
  >
    <p
      v-if="flipCardAlert"
      class="text-red-600 font-semibold text-base md:text-lg"
    >
      Alert! Flip The Card to begin!
    </p>
    <div
      className="grid md:flex md:flex-cols-2 flex-wrap md:justify-center gap-4 text-center"
      v-if="currentRiddle"
    >
      <div class="">
        <h1 class="font-extrabold text-purple-700 my-4">Find the RIDDLE</h1>
        <div
          class="flip-card md:w-64 h-[250px] md:h-5/6 hover:scale-110 shadow-xl"
          @click="flipCard"
        >
          <transition name="flip" mode="out-in">
            <div
              :key="isFlipped"
              class="card p-4 text-white h-full"
              :class="{ front: !isFlipped, back: isFlipped }"
            >
              <div v-if="!isFlipped" class="card-front">
                <!-- Display a hint or category here -->
                <h2>Flip this card to reveal the Riddle</h2>
              </div>
              <div v-else class="card-back">
                <!-- Display the riddle text here -->
                <h2>{{ currentRiddle.question }}</h2>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="mt-2 md:mt-2">
        <h1 class="font-extrabold text-purple-700 md:my-4 my-2">
          Click any of the choice you think is right
        </h1>
        <!-- Answer Choices -->
        <ul
          :class="{
            'md:grid-cols-3': numColumns === 3,

            'grid-cols-2': numColumns === 2,
          }"
          class="options grid gap-2 grid-cols-2 place-items-center"
        >
          <li
            :class="{ 'hover:scale-110': isFlipped }"
            class="options-card w-[170px] h-[120px] md:w-[200px] md:h-[280px]"
            v-for="(option, idx) in currentOptions"
            @click="checkAnswer(option.attributes.correct)"
          >
            <div class="card p-4 text-left">
              <div>
                <h2 class="text-purple-600">
                  Option {{ getAnswerLetter(idx) }}:
                </h2>
                <p v-if="isFlipped">{{ option.attributes.choice }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- end or riddle box -->
    </div>

    <!-- The message modal -->
    <FeedBackModal
      :message="feedbackMessage"
      :showFeedBackModal="showFeedback"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import FeedBackModal from "../components/riddles/FeedBackModal.vue";

import axios from "axios";

const router = useRouter();
const riddles = ref([]);
const currentIndex = ref(0);
const currentRiddle = ref(null);
const currentOptions = ref([]);

const isFlipped = ref(false);
const flipCardAlert = ref(false);
const showFeedback = ref(false);
const feedbackMessage = ref("");
const selectedChoices = ref([]);

// Fetch the survey data
onMounted(async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/riddle-questions?populate=*`
  );

  riddles.value = res.data.data;

  console.log(riddles.value);

  currentRiddle.value = riddles.value[currentIndex.value].attributes;
  currentOptions.value = [
    ...riddles.value[currentIndex.value].attributes.options.data,
  ];
});

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};

const checkAnswer = (choice) => {
  if (showFeedback.value === true) {
    // Don't allow answer selection during modal display or card flipping
    return;
  }

  if (!isFlipped.value) {
    flipTheRiddleCard();
    return; // Don't allow answer selection if the card is not flipped
  }

  if (choice === true) {
    handleFeedBackModal("correct");
  } else {
    handleFeedBackModal("wromg");
  }
};

// Set the number of columns based on the number of choices
const numColumns = computed(() => {
  return currentOptions.value.length > 4 ? 3 : 2; // Adjust the threshold as needed
});

// Next and previous question handlers
const nextQuestion = () => {
  isFlipped.value = false;

  if (currentIndex.value <= riddles.value.length - 1) {
    currentIndex.value++;

    // go to next game once all questions are done
    if (currentIndex.value > riddles.value.length - 1) {
      finishRiddle();
      return;
    }

    currentRiddle.value = riddles.value[currentIndex.value].attributes;
    currentOptions.value =
      riddles.value[currentIndex.value].attributes.options.data;
  }
};

const handleFeedBackModal = (type) => {
  showFeedback.value = true;

  if (type === "correct") {
    feedbackMessage.value = "Correct! Well done!";
  } else {
    feedbackMessage.value = "Oops! That's not correct.";
  }

  // Hide the modal after a delay
  setTimeout(() => {
    nextQuestion();
    showFeedback.value = false;
  }, 2100);
};

const flipTheRiddleCard = () => {
  flipCardAlert.value = true;

  // Hide the modal after a delay
  setTimeout(() => {
    flipCardAlert.value = false;
  }, 1400);
};

const finishRiddle = () => {
  // Perform any actions needed when finishing the survey
  // For example, save the survey responses or navigate to another page
  // In this case, we navigate to the "riddles" page
  router.push({ name: "scramble-view" });
};

// Convert the index to a letter (A, B, C, D, ...)
const getAnswerLetter = (idx) => {
  return String.fromCharCode(65 + idx); // 65 is the ASCII code for 'A'
};
</script>

<style>
.flip-card {
  perspective: 1000px;
  cursor: pointer;
}
.options-card {
  perspective: 1000px;
  cursor: pointer;
}

.card {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  border-radius: 7px;
  justify-content: center;
  align-items: center;

  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0.4, 0, 0, 0.2);
  will-change: transform;
  backface-visibility: hidden;
}

.front {
  background-color: #feca34;
}

.back {
  background-color: #800e80;
  /* backface-visibility: visible; */
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s ease;
}

.flip-enter,
.flip-leave-to {
  transform: rotateY(180deg);
  /* opacity: 0; */
}

ul inactive {
  cursor: not-allowed;
}
</style>
