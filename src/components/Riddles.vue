<template>
  <div
    className="box-border h-screen  2xl:bg-white	md:flex md:flex-col items-center text-sm md:text-lg md:pt-2"
  >
    <p
      v-if="flipCardAlert"
      class="text-red-600 font-semibold text-base md:text-lg text-center"
    >
      Alert! Flip The Card to begin!
    </p>
    <div
      className="grid md:flex md:flex-cols-2 flex-wrap  md:justify-center gap-4 md:gap-10 text-center md:pb-12"
      v-if="currentRiddle"
    >
      <div class="">
        <h1 class="font-extrabold text-purple-700 my-1 md:my-4">
          Find the RIDDLE
        </h1>
        <div
          class="flip-card md:w-72 h-[250px] md:h-5/6 md:hover:scale-100 shadow-xl"
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
          Click any of the choices you think are correct
        </h1>
        <!-- Answer Choices -->
        <ul
          :class="{
            'md:grid-cols-3': numColumns === 3,

            'grid-cols-2': numColumns === 2,
          }"
          class="options grid md:gap-4 gap-2 grid-cols-2 place-items-center"
        >
          <li
            :class="{ 'hover:scale-110': isFlipped }"
            class="options-card w-[170px] h-[120px] md:w-[220px] md:h-[240px]"
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
      :messageTextColor="feedbackColor"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import FeedBackModal from "../components/riddles/FeedBackModal.vue";

const router = useRouter();
const getRiddles = ref([]);
const riddles = ref([]);
const currentIndex = ref(0);
const currentRiddle = ref(null);
const currentOptions = ref([]);

const riddlesCorrect = ref(0);
const totalRiddles = ref(4);
const isFlipped = ref(false);
const flipCardAlert = ref(false);
const showFeedback = ref(false);
const feedbackMessage = ref("");

const feedbackColor = ref("");
const selectedChoices = ref([]);

// Fetch the survey data
onMounted(async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/riddles?populate=*`
  );

  getRiddles.value = shuffle(res.data.data);
  // console.log(res.data.data);

  riddles.value = getRiddles.value.slice(0, 4);

  currentRiddle.value = riddles.value[currentIndex.value].attributes;
  currentOptions.value = [
    ...riddles.value[currentIndex.value].attributes.options.data,
  ];
});
// Computed property to calculate the width of the progress bar
const trueFeedback = computed(() => {
  let trueeeet = currentRiddle.value.feedbackTrue;
  return trueeeet;
});
// Computed property to calculate the width of the progress bar
const feebackFalse = computed(() => {
  let trueeeet = currentRiddle.value.feebackFalse;
  return trueeeet;
});

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
    riddlesCorrect.value++;
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

  // Check if there are more riddles to display
  if (currentIndex.value < riddles.value.length - 1) {
    currentIndex.value++;

    currentRiddle.value = riddles.value[currentIndex.value].attributes;
    currentOptions.value =
      riddles.value[currentIndex.value].attributes.options.data;
  } else {
    // Display the last riddle and then end the game
    finishRiddle();
  }
};

const handleFeedBackModal = (type) => {
  showFeedback.value = true;

  if (type === "correct") {
    feedbackMessage.value = trueFeedback.value;
    feedbackColor.value = "text-green-400";
  } else {
    feedbackMessage.value = feebackFalse.value;
    feedbackColor.value = "text-red-400";
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

// Computed property to calculate the percentage
const riddlePercentage = computed(() => {
  if (totalRiddles.value === 0) {
    return 0; // Avoid division by zero error
  }
  return (riddlesCorrect.value / totalRiddles.value) * 100;
});

const finishRiddle = () => {
  // Perform any actions needed when finishing the survey
  localStorage.setItem("riddleScore", riddlePercentage.value);

  // For example, save the survey responses or navigate to another page
  // In this case, we navigate to the "riddles" page
  router.push({ name: "scramble" });
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
