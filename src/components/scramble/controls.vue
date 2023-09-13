<template>
  <div id="controls" class="mx-auto pt-4">
    <button
      class="sub-btn px-2 py-2 md:px-4 md:py-3 md:mr-4"
      @click="submitAction"
      :disabled="!enableSubmit"
    >
      Submit
    </button>
    <button
      class="shuffle-btn px-2 py-2 md:px-4 md:py-3 ml-1.5 md:mr-4"
      @click="shuffleQuestion"
    >
      Shuffle
    </button>

    <button
      class="clear-btn px-2 py-2 md:px-4 md:py-3 ml-1.5 md:mr-4"
      @click="clearAction"
    >
      Clear
    </button>
  </div>
</template>

<script setup>
import Velocity from "velocity-animate";
import Store from "../../store/index.js";
import { computed, ref, onMounted } from "vue";

const props = defineProps(["currentQuestion", "dropAreaData"]);
const emit = defineEmits(["updateScore", "clearAction", "checkAnswer"]);

const currentWord = computed(() => {
  return props.currentQuestion?.word || ""; // Ensure it's a string even if undefined
});
const usersAnswers = computed(() => {
  return props.currentQuestion?.userAnswers || []; // Ensure it's a string even if undefined
});
const correctWord = computed(() => {
  return props.currentQuestion.correctWord; // Ensure it's a string even if undefined
});

const dropAreaData = computed(() => {
  return props.dropAreaData?.value || []; // Ensure it's a string even if undefined
});

const isShuffling = ref(false);

const enableSubmit = computed(() => {
  const allSlotsFilled = currentWord.value.length === usersAnswers.value.length;
  return allSlotsFilled;
});

// Fetch the scramble data
const submitAction = () => {
  emit("checkAnswer");
};

const lastWord = () => {
  var arr = Store.gameData.word.split("");
  for (var i = 0; i < arr.length; i++) {
    $emit(
      "bringDownAll",
      document.querySelector("#q-area li[data-id=" + arr[i] + "]"),
      "letterUp",
      arr[i]
    );
  }
};

const shuffleQuestion = () => {
  const shuffledWord = shuffle(currentWord.value);
  currentWord.value = shuffledWord;
  // }
};

const shuffle = (array) => {
  var tmp;
  var current;
  var top = array.length;
  if (top) {
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  }
  return array;
};

const clearAction = () => {
  emit("clearAction");
};
</script>
<style>
#controls button {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  border: 0 solid rgba(0, 0, 0, 1);
  border-radius: 10px;
  font: normal normal bold 1.6em / normal "Syncopate", Helvetica, sans-serif;
  color: #ecf0f1;
  background: linear-gradient(180deg, #ff8583 0, #ff5350 100%);
  box-shadow: 0 10px 0 0 rgba(178, 49, 49, 1);
  text-shadow: 0 1px 0px #378ab4, 1px 0 0px #5dabcd, 1px 1px 1px #378ab4,
    0.5px 0.5px 0.5px #5dabcd, 1px 2px 1px #378ab4, 2px 3px 2px #378ab4,
    3px 2px 2px #5dabcd, 3px 4px 2px #378ab4, 4px 3px 3px #5dabcd,
    4px 5px 3px #378ab4, 5px 4px 2px #5dabcd, 5px 6px 2px #378ab4,
    6px 5px 2px #5dabcd;
}
#controls button:hover {
  background: linear-gradient(180deg, #ce6161 0, #ef6664 100%);
}
#controls button:active {
  top: 5px;
  box-shadow: 0 5px 0 0 rgba(178, 49, 49, 1);
}
#controls button:disabled {
  box-shadow: 0 10px 0 0 #999;
  background: linear-gradient(180deg, #c7c4c4 0, #b3b0b0 100%);
  text-shadow: none;
  cursor: not-allowed;
}
</style>
