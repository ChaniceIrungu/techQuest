<template>
  <div class="flex flex-col justify-center items-center px-2">
    <div class="pb-2 md:pb-10 text-lg">
      <p>
        Your current goal is to :
        <span class="font-bold">{{ recommendation.goal }}</span>
      </p>
      <p>
        Here are some recommendation that would suit you
        <span class="text-xl capitalize font-extrabold"> {{ userName }}:</span>
      </p>
    </div>
    <div class="grid md:flex md:gap-x-4 gap-y-4 place-content-center">
      <div class="max-w-sm rounded overflow-hidden shadow-xl">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">What to Study</div>
          <p class="text-gray-700 text-base">
            {{ recommendation.whatToStudy }}
          </p>
        </div>
      </div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Type of Course</div>
          <p class="text-gray-700 text-base">
            {{ recommendation.course }}
          </p>
        </div>
      </div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Where to Find a Job:</div>
          <p class="text-gray-700 text-base">
            {{ recommendation.job }}
          </p>
        </div>
      </div>
    </div>

    <div class="pt-2 md:pt-6 justify-self-start">
      <cButton @click="nextRecommendation" :buttonText="' Next'" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import recommendations from "../store/recommend.js";
import cButton from "./Button.vue";
const emit = defineEmits("openEnd");

const router = useRouter();

const userName = ref("human");
const responses = ref([]);

onMounted(async () => {
  userName.value = localStorage.getItem("name");
  responses.value = JSON.parse(localStorage.getItem("responses"));
  //   console.log("response", responses.value);
});

const selectedChoiceIdx = computed(() => {
  //   let getIdxes = responses.value
  //     .map((response) => response.choicesIdx)
  //     .filter((choices) => choices.length > 0);

  // Find the object with questionNumber equal to 2
  const responseWithQuestion2 = responses.value.find(
    (response) => response.questionNumber === 2
  );

  // Extract the choicesIdx from that object
  const choicesIdxValueForQuestion2 = responseWithQuestion2
    ? responseWithQuestion2.choicesIdx[0]
    : 0;

  return choicesIdxValueForQuestion2;
});

const recommendation = computed(() => {
  // Assuming you have the currentQuestionNumber and currentChoiceIdx
  const currentQuestionNumber = 2; // Replace with the actual question number
  const currentChoiceIdx = selectedChoiceIdx.value; // Replace with the actual choice index
  // Find the recommendation that matches the current question number and choice index
  return recommendations.find(
    (rec) =>
      rec.question === currentQuestionNumber &&
      rec.choicesIdx === currentChoiceIdx
  );
});

const nextRecommendation = () => {
  emit("openEnd");
};
</script>
