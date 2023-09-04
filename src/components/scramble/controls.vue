<template>
  <div id="controls" class="m-auto">
    <button
      class="sub-btn px-1 py-1 md:px-4 md:py-3 mr-1 md:mr-4"
      @click="submitAction"
      :disabled="!enableSubmit"
    >
      Submit
    </button>
    <button
      class="shuffle-btn px-1 py-1 md:px-4 md:py-3 mr-1 md:mr-4"
      @click="shuffleQuestion"
    >
      Shuffle
    </button>

    <button
      class="clear-btn px-1 py-1 md:px-4 md:py-3 mr-1 md:mr-4"
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
  text-shadow: 0 0 0 rgb(196, 80, 78), 1px 1px 0 rgb(196, 80, 78),
    2px 2px 0 rgb(196, 80, 78), 3px 3px 0 rgb(196, 80, 78),
    4px 4px 0 rgb(196, 80, 78), 5px 5px 0 rgb(196, 80, 78),
    6px 6px 0 rgb(196, 80, 78), 7px 7px 0 rgb(196, 80, 78),
    8px 8px 0 rgb(196, 80, 78), 9px 9px 0 rgb(196, 80, 78),
    10px 10px 0 rgb(196, 80, 78), 11px 11px 0 rgb(196, 80, 78),
    12px 12px 0 rgb(196, 80, 78), 13px 13px 0 rgb(196, 80, 78),
    14px 14px 0 rgb(196, 80, 78), 15px 15px 0 rgb(196, 80, 78),
    16px 16px 0 rgb(196, 80, 78), 17px 17px 0 rgb(196, 80, 78),
    18px 18px 0 rgb(196, 80, 78), 19px 19px 0 rgb(196, 80, 78),
    20px 20px 0 rgb(196, 80, 78), 21px 21px 0 rgb(196, 80, 78),
    22px 22px 0 rgb(196, 80, 78), 23px 23px 0 rgb(196, 80, 78),
    24px 24px 0 rgb(196, 80, 78), 25px 25px 0 rgb(196, 80, 78),
    26px 26px 0 rgb(196, 80, 78), 27px 27px 0 rgb(196, 80, 78),
    28px 28px 0 rgb(196, 80, 78), 29px 29px 0 rgb(196, 80, 78),
    30px 30px 0 rgb(196, 80, 78), 31px 31px 0 rgb(196, 80, 78),
    32px 32px 0 rgb(196, 80, 78), 33px 33px 0 rgb(196, 80, 78),
    34px 34px 0 rgb(196, 80, 78), 35px 35px 0 rgb(196, 80, 78),
    36px 36px 0 rgb(196, 80, 78), 37px 37px 0 rgb(196, 80, 78),
    38px 38px 0 rgb(196, 80, 78), 39px 39px 0 rgb(196, 80, 78),
    40px 40px 0 rgb(196, 80, 78), 41px 41px 0 rgb(196, 80, 78),
    42px 42px 0 rgb(196, 80, 78), 43px 43px 0 rgb(196, 80, 78),
    44px 44px 0 rgb(196, 80, 78), 45px 45px 0 rgb(196, 80, 78),
    46px 46px 0 rgb(196, 80, 78), 47px 47px 0 rgb(196, 80, 78),
    48px 48px 0 rgb(196, 80, 78), 1px 1px 0 rgba(196, 80, 78, 0.980392),
    2px 2px 0 rgba(196, 80, 78, 0.960784), 3px 3px 0 rgba(196, 80, 78, 0.941176),
    4px 4px 0 rgba(196, 80, 78, 0.921569), 5px 5px 0 rgba(196, 80, 78, 0.901961),
    6px 6px 0 rgba(196, 80, 78, 0.882353), 7px 7px 0 rgba(196, 80, 78, 0.862745),
    8px 8px 0 rgba(196, 80, 78, 0.843137), 9px 9px 0 rgba(196, 80, 78, 0.819608),
    10px 10px 0 rgba(196, 80, 78, 0.8), 11px 11px 0 rgba(196, 80, 78, 0.780392),
    12px 12px 0 rgba(196, 80, 78, 0.760784),
    13px 13px 0 rgba(196, 80, 78, 0.741176),
    14px 14px 0 rgba(196, 80, 78, 0.721569),
    15px 15px 0 rgba(196, 80, 78, 0.701961),
    16px 16px 0 rgba(196, 80, 78, 0.682353),
    17px 17px 0 rgba(196, 80, 78, 0.658824),
    18px 18px 0 rgba(196, 80, 78, 0.639216),
    19px 19px 0 rgba(196, 80, 78, 0.619608), 20px 20px 0 rgba(196, 80, 78, 0.6),
    21px 21px 0 rgba(196, 80, 78, 0.580392),
    22px 22px 0 rgba(196, 80, 78, 0.560784),
    23px 23px 0 rgba(196, 80, 78, 0.541176),
    24px 24px 0 rgba(196, 80, 78, 0.521569),
    25px 25px 0 rgba(196, 80, 78, 0.498039),
    26px 26px 0 rgba(196, 80, 78, 0.478431),
    27px 27px 0 rgba(196, 80, 78, 0.458824),
    28px 28px 0 rgba(196, 80, 78, 0.439216),
    29px 29px 0 rgba(196, 80, 78, 0.419608), 30px 30px 0 rgba(196, 80, 78, 0.4),
    31px 31px 0 rgba(196, 80, 78, 0.380392),
    32px 32px 0 rgba(196, 80, 78, 0.360784),
    33px 33px 0 rgba(196, 80, 78, 0.341176),
    34px 34px 0 rgba(196, 80, 78, 0.317647),
    35px 35px 0 rgba(196, 80, 78, 0.298039),
    36px 36px 0 rgba(196, 80, 78, 0.278431),
    37px 37px 0 rgba(196, 80, 78, 0.258824),
    38px 38px 0 rgba(196, 80, 78, 0.239216),
    39px 39px 0 rgba(196, 80, 78, 0.219608);
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
