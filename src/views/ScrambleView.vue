<template>
  <div id="gameApp " class="relative flex flex-col">
    <section class="">
      <!-- game has not started and hideMenu is false -->
      <ScrambleMenu @init-game="initGame" v-if="!isGameStarted && !hideMenu" />

      <!-- render when game is started and hideMenu is true -->
      <div
        class="absolute top-0 z-40 w-full p-2 md:flex md:flex-col md:p-8 h-screen bg-[#ffffffde] border rounded-lg box-border tracking-wide"
        v-if="isGameStarted && hideMenu"
      >
        <div class="float-center text-red-400 text-2xl">
          Time Left: {{ timerText }}
        </div>
        <!-- The message modal -->
        <AlertModal
          :title="alertBox.title"
          :message="alertBox.message"
          :showTimeUpModal="showFeedbackModal"
          @close="closeModal"
        />

        <Scores :level="level" :score="score" />
        <div class="main-menu-btn float-right text-blue-400 text-sm">
          <span class="text-black"> Hint : </span>
          <span v-if="showHint">{{ currentQuestion.hint }}</span>
          <button v-if="!showHint" @click="toggleHint">
            <img src="/question-min.png" alt="Question Mark" />
          </button>
        </div>

        <div class="game-area mt-8 mx-auto">
          <ul id="drop-area " class="word-box">
            <li
              v-for="(item, Idx) in dropAreaData"
              :key="Idx"
              class="character-box h-12 w-12 md:h-20 md:w-20 bg-blue-400"
              :class="[
                'character-box',
                { inactive: !item.isActive, active: item.isActive },
              ]"
              :data-letter-id="Idx"
              @click="letterDown($event, item.letter, idx, item.qAreaIdxHolder)"
            >
              {{ item.letter }}
            </li>
          </ul>

          <ul id="q-area" class="word-box">
            <li
              v-for="(question, idx) in gameData.word"
              :key="idx"
              class="character-box h-12 w-12 md:h-20 md:w-20"
              :class="[
                'character-box',
                isLetterIndexClicked(question, idx) ? 'inactive' : 'active',
              ]"
              :letter-id="question"
              @click="letterUp($event, question, idx)"
            >
              {{ question }}
            </li>
          </ul>
        </div>
        <controls
          v-if="!showHowToPlayModal"
          :current-question="gameData"
          :drop-area-data="dropAreaData"
          @clearAction="clearAction()"
          @checkAnswer="checkAnswer()"
        ></controls>
        <transition name="slide-fade" class="pt-8 mx-auto"
          ><p class="next-level-button">
            Skip this level
            <button
              v-if="!showHowToPlayModal"
              class="btn bg-green-500 hover:bg-green-700 rounded py-2 px-18"
              @click="generateQuestion"
            >
              <span class="p-2">Next question</span>
            </button>
          </p></transition
        >

        <!-- instructions -->
        <div
          v-if="showHowToPlayModal === true"
          class="how-to-play absolute top-0 h-full w-[90%] bg-[#ffffffde] p-8"
        >
          <h3 class="text-center text-fuchsia-700 font-bold text-2xl pb-2">
            How To Play
          </h3>
          <p class="py-2">
            There are jumbled letters. Arrange the letters to form a possible
            WORD.
          </p>
          <p class="py-2">
            Click on the <strong>WHITE</strong> balls to move letters up to form
            WORDS.And click the YEllow ball to move them down and cancel a move.
            <b>&lt;Submit&gt;</b> button will be enabled once all the letters at
            top are filled.
          </p>

          <p class="py-2">
            At-least one 5 letter word is required to go next level.
          </p>

          <p style="text-align: center" class="py-4">
            <cButton :buttonText="'Start'" @click="generateQuestion" />
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, onMounted } from "vue";
import cButton from "../components/Button.vue";
import Scores from "../components/Score.vue";
import { useRouter } from "vue-router";
import words from "../store/questions.js";
import controls from "../components/scramble/controls.vue";
import AlertModal from "../components/AlertModal.vue";
import axios from "axios";

// Load the tutorial components as lazy-loaded components since they appear in the view later (after user interaction).
const ScrambleMenu = defineAsyncComponent(() =>
  import("../components/ScrambleMenu.vue")
);
const router = useRouter();

const shuffledData = ref([]);
const getData = ref([]);
const totalData = ref(4);
const currentQuestion = ref({});

const gameData = ref({});
const dropAreaData = ref([]);
const correctWord = ref("");
const clickedqAreaLetters = ref([]);
const qAreaIdxHolder = ref(null);
const questionIdx = ref(0);
const isActive = ref(false);

const isGameStarted = ref(false);
const showHint = ref(false);
const showHowToPlayModal = ref(false);
const showFeedbackModal = ref(false);
const hideMenu = ref(false);

const level = ref(0);
const totalCorrect = ref(0);
const timerText = ref(20);
const score = ref(0);
const alertBox = ref({
  title: "",
  message: "",
});

let timerInterval;

// Fetch the scramble data
onMounted(async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/scrambles`);
  shuffledData.value = shuffle(res.data.data);
  getData.value = shuffledData.value.slice(0, totalData.value);
  // console.log("currentQuestion", shuffledData.value);
});

const initGame = () => {
  isGameStarted.value = true;
  hideMenu.value = true;
  showHowToPlayModal.value = true;
};

const generateQuestion = () => {
  if (isGameStarted.value && hideMenu.value) {
    // Hide show how to play modal
    clearInterval(timerInterval);
    showHint.value = false;
    if (showHowToPlayModal.value) {
      showHowToPlayModal.value = false;
    }

    clearAction();
    // Check if there are more words(gameData) to display
    if (questionIdx.value < getData.value.length) {
      level.value++; // Increment the level
      // Generate next question
      currentQuestion.value = getData.value[questionIdx.value].attributes;
      // Store the correct word separately
      correctWord.value = currentQuestion.value.correctWord;
      // Create a shuffled version of the word
      const shuffledWord = shuffle([...currentQuestion.value.word]);

      // Create an array to store the letters in drop area
      dropAreaData.value = Array.from(
        { length: currentQuestion.value.word.length },
        () => ({
          letter: "",
          isActive: isActive.value,
          qAreaIdxHolder: qAreaIdxHolder.value,
        })
      );

      // Set the game data for the current question
      gameData.value = {
        word: shuffledWord,
        userAnswers: [],
        hint: currentQuestion.value.hint,
        correctWord: correctWord.value,
      };

      // Increment question index for the next question
      questionIdx.value++;

      // Start the timer after setting up the question data
      initTimer(20);
    } else {
      // Displayed all questions, end the game
      localStorage.setItem("scrambleScore", scramblePercentage.value);
      router.push({ name: "true-false" });
    }
  }
};

const updateScore = () => {
  score.value = score.value += 10;
};

// register event on letter click and the letter
const letterUp = (event, letter, qAreaIndex) => {
  event.stopPropagation();

  // If letter exists in dropArea, return early
  if (isLetterIndexClicked(letter, qAreaIndex)) {
    return;
  }
  // log clicked letter
  clickedqAreaLetters.value.push({ letter, qAreaIndex });

  //  currentTarget refers to the parent <ul> in this context
  let currElem = event.currentTarget;
  // currElem.style.visibility = "hidden";
  updateDropArea(currElem, letter, qAreaIndex);
};

const isLetterIndexClicked = (letter, qAreaIndex) => {
  return clickedqAreaLetters.value.some(
    (item) => item.letter === letter && item.qAreaIndex === qAreaIndex
  );
};

const letterDown = (event, letter, idx, qAreaIndex) => {
  if (!letter) return false;
  event.stopPropagation();
  let currElem = event.currentTarget;
  removeLetterFromDropArea(currElem, letter, idx, qAreaIndex);
};

// update drop area after letter up
const updateDropArea = (currElem, letter, qAreaIndex) => {
  if (currElem.classList.contains("animating")) return false;

  currElem.classList.add("animating");
  currElem.style.transition =
    "bottom 0.6s ease-in-out, opacity 0.5s ease-in-out";

  // Find the index of an empty slot in dropAreaData
  const emptySlotIndex = dropAreaData.value.findIndex(
    (item) => item.letter === ""
  );

  if (emptySlotIndex !== -1) {
    dropAreaData.value[emptySlotIndex].letter = letter;
    dropAreaData.value[emptySlotIndex].isActive = isActive.value = true;
    dropAreaData.value[emptySlotIndex].qAreaIdxHolder = qAreaIndex;

    currElem.style.transform = "translateY(-10px)";

    // After the animation is done, remove animation class and reset styles
    setTimeout(() => {
      currElem.classList.remove("animating");
      currElem.style.transition = "";
      currElem.style.transform = ""; // Reset position
    }, 300);
  }

  const allSlotsFilled = dropAreaData.value.every((slot) => slot.letter !== "");
  const lettersOnly = dropAreaData.value.map((item) => item.letter);
  if (allSlotsFilled) {
    // console.log("all slots filled");
    gameData.value.userAnswers = [...lettersOnly];
  }
};

// update question area after letter down
const removeLetterFromDropArea = (currElem, letter, index, qAreaIndex) => {
  if (currElem.classList.contains("animating")) return false;

  currElem.classList.add("animating");
  const dropAreaIndex = dropAreaData.value.findIndex(
    (item) => item.letter === letter
  );

  const dropAreaItem = dropAreaData.value[dropAreaIndex];
  // Update drop area data
  dropAreaItem.isActive = isActive.value = false;
  dropAreaItem.letter = "";
  dropAreaItem.qAreaIdxHolder = null;

  // Check if the letter and index exists in the clickedLetters array
  if (isLetterIndexClicked(letter, qAreaIndex)) {
    // Remove the clicked letter object from the clickedLetters array
    clickedqAreaLetters.value = clickedqAreaLetters.value.filter(
      (item) => !(item.letter === letter && item.qAreaIndex === qAreaIndex)
    );
  }

  // Apply animation styles
  currElem.style.transition = "bottom 0.8s ease-in-out";
  currElem.style.transform = "translateY(10px)"; // bounce

  // After the animation is done, remove animation class and reset styles
  setTimeout(() => {
    currElem.classList.remove("animating");
    currElem.style.transform = ""; // Reset position
    currElem.style.transition = "";
  }, 300);
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffle = (arr) => {
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

const clearAction = () => {
  dropAreaData.value.forEach((item) => {
    let letter = item.letter;
    let idxholder = item.qAreaIdxHolder;

    if (isLetterIndexClicked(letter, idxholder)) {
      // Remove the clicked letter object from the clickedLetters array
      clickedqAreaLetters.value = clickedqAreaLetters.value.filter(
        (clickedItem) =>
          !(
            clickedItem.letter === letter &&
            clickedItem.qAreaIndex === idxholder
          )
      );
      clickedqAreaLetters.value = [];
      // dropAreaData.value = [];
    }

    item.letter = "";
    item.isActive = false;
    item.qAreaIdxHolder = null;
  });
};

const checkAnswer = () => {
  // console.log("userss Answer", gameData.value.userAnswers.join(""));
  clearInterval(timerInterval);
  let correctWord = gameData.value.correctWord;
  //  if array convert to string
  // if (Array.isArray(correctWord)) {
  //   correctWord = correctWord.join("");
  // }
  let userAnswers = gameData.value.userAnswers.join("");
  if (userAnswers !== correctWord) {
    handleModalOk("wrong");
  } else {
    updateScore();
    if (!showHint.value) {
      // Increase the score if the hint was not clicked
      score.value += 10;
    }
    handleModalOk("correct");
  }
};

const handleModalOk = (alert) => {
  clearInterval(timerInterval);

  if (alert && showFeedbackModal.value === true) {
    // Don't show the modal if it's already showing
    // closeModal();
    return;
  }
  showFeedbackModal.value = true;
  let userAnswers = gameData.value.userAnswers.join("");

  if (alert === "wrong") {
    alertBox.value.title = "Oops!";
    alertBox.value.message = `${userAnswers} is not the correct word`;
  } else if (alert === "correct") {
    totalCorrect.value++;
    alertBox.value.title = "Congrats!";
    alertBox.value.message = `${correctWord.value.toUpperCase()} is the correct word`;
  } else {
    alertBox.value.title = "Oops! Time's UP";
    alertBox.value.message = `The correct word was: ${correctWord.value.toUpperCase()}`;
  }

  // Hide the modal after a delay
  setTimeout(() => {
    generateQuestion();
    closeModal();
    // showFeedbackModal.value = false;
  }, 2100);
};

const closeModal = () => {
  showFeedbackModal.value = !showFeedbackModal.value;
};

const initTimer = (maxTime) => {
  if (isGameStarted.value && hideMenu.value) {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (maxTime >= 0) {
        // Change condition to include 0 seconds
        // Ensure the timer starts at 20 seconds instead of 19
        timerText.value = maxTime.toString().padStart(2, "0");
        maxTime--; // Decrement the timer after updating the display
      } else {
        clearInterval(timerInterval);
        handleModalOk("timeUp");
      }
    }, 1000); // Set interval to 1 second (1000 milliseconds)
  }
};

const toggleHint = () => {
  showHint.value = !showHint.value;
};

const scramblePercentage = computed(() => {
  // localStorage.setItem("scramblecore", scramblePercentage.value);
  if (totalData.value === 0) {
    return 0; // Avoid division by zero error
  }
  return (totalCorrect.value / totalData.value) * 100;
});
</script>

<style>
.word-box {
  margin-bottom: 10px;
  display: flex;
}

.character-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  opacity: 1;
  font-weight: bold;
  font-size: 2em;
  border: 1px solid #aab7ad;
  border-radius: 30%;
  margin-right: 5px;
  cursor: pointer;
}

.character-box:after {
  background: radial-gradient(
    circle at 50% 0px,
    #ffffff,
    rgba(255, 255, 255, 0) 58%
  );
  -webkit-filter: blur(5px);
  z-index: 2;
}

ul li.inactive:after,
ul li.animating:after {
  top: 72%;
  left: 62%;
  width: 100%;
  height: 100%;

  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8) 14%,
    rgba(255, 255, 255, 0) 24%
  );
  -webkit-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  -moz-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  -ms-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  -o-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  transform: translateX(-80px) translateY(-90px) skewX(-20deg);
}

ul li.inactive,
ul li.animating {
  background: radial-gradient(circle at 25px 25px, #ffffff, #156bc8);
  color: rgb(113, 109, 109);
  cursor: not-allowed;
}

.start-btn {
  background: linear-gradient(#76ecf1, #2459de);
}
</style>
