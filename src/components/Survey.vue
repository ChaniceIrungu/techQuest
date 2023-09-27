<template>
  <div class="h-full text-center md:pb-2 pb-12">
    <div class="w-full p-2">
      <div class="pb-2">
        <div>Progress</div>

        <!-- <div
          class="p-1 border-1 border-yellow-700 rounded-full bg-fuchsia-600 text-white"
        >
          {{ currentIndex + 1 }}/{{ surveys.length }}
        </div> -->

        <div class="p-1 border-1 border-yellow-700 rounded-full bg-gray-200">
          <div
            :style="{ width: progressBarWidth }"
            class="rounded-full bg-fuchsia-600 text-white h-6"
          >
            {{ currentIndex + 1 }}/{{ surveys.length }}
          </div>
        </div>
      </div>

      <!-- Survey goes here -->
      <div id="surv" class="bg-[#F3F3F3] border border-rounded-md my-4">
        <div class="p-4" v-if="currentQuestion">
          <p class="font-bold md:text-2xl text-xl">
            {{ currentQuestion.attributes.question }}
          </p>
          <div v-if="showError" class="text-red-500 text-left">
            Input required/Select a choice
          </div>
          <div class="p-4" v-if="currentQuestion.attributes.type === 'input'">
            <input
              type="text"
              class="input p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              name=""
              placeholder="Enter preferred name"
              v-model="userInput"
            />
          </div>

          <div v-else class="cursor-pointer">
            <div
              class="py-2 text-left"
              v-for="(choice, key, index) in currentQuestion.attributes.choices"
              :key="index"
            >
              <label
                class="flex items-center space-x-4 border-2 rounded p-2 hover:bg-blue-200 cursor-pointer"
              >
                <input
                  :type="
                    currentQuestion.attributes.multiple ? 'checkbox' : 'radio'
                  "
                  :checked="isSelected(index)"
                  @change="updateSelectedChoices(index, choice)"
                  class="rounded-full h-4 w-4"
                />
                <span class="p-0.5 md:p-2">{{ choice }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- end survey -->
      <div class="mt-4 inline">
        <button
          class="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-r hover:from-violet-700 hover:to-fuchsia-700 p-3 rounded-full"
          @click="nextQuestion"
          :disabled="!userInput"
          :class="[!userInput ? 'cursor-not-allowed ' : '', buttonColor]"
        >
          {{ nextQuestionText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";

import axios from "axios";

const surveys = ref([]);
const currentIndex = ref(0);
const userInput = ref("");
const showError = ref(false);
const currentQuestion = ref(null);
const nextQuestionText = ref("Next Question");
const responses = ref([]);
const router = useRouter();
// Initialize selectedChoices as an array of arrays to store selections for each question
const selectedChoices = ref([]);

// Fetch the survey data
onMounted(async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/surveys?populate=*`
  );
  surveys.value = res.data.data;
  currentQuestion.value = surveys.value[currentIndex.value];
});

// Computed property to calculate the width of the progress bar
const progressBarWidth = computed(() => {
  if (surveys.value.length === 0) {
    return "0%";
  }
  const progress = ((currentIndex.value + 1) / surveys.value.length) * 100;
  return `${progress}%`;
});

// Function to check if a choice is selected
const isSelected = (index) => {
  if (selectedChoices.value.length) {
    return selectedChoices.value.includes(index);
  }
};

// Function to update selectedChoices array
const updateSelectedChoices = (index, input) => {
  // const currentIndexValue = currentIndex.value;
  const choices = selectedChoices.value;

  // const questionResponse = {
  //   questionNumber: currentQuestion.value.id, // Store the question number
  //   choice: choices,
  // };
  // If it's a multiple-choice question, toggle selection
  if (currentQuestion.value.attributes.multiple) {
    const choiceIndex = choices.indexOf(index);
    // If the choice is not already selected (not found in the array)
    if (choiceIndex === -1) {
      choices.push(index);
    } else {
      // If the choice is already selected (found in the array)
      choices.splice(choiceIndex, 1);
    }
  } else {
    // For single-choice questions, replace the selection
    choices.length = 0; // Clear the array
    choices.push(index); // Add the new selections
  }
};

const shouldDisableNextButton = computed(() => {
  // Check if there are no selected choices for checkbox or radio questions
  if (
    userInput.value.trim() !== "" &&
    currentQuestion.value.attributes.type !== "input"
  ) {
    // Check if there are no selected choices for checkbox or radio questions
    if (currentQuestion.value.attributes.multiple) {
      return selectedChoices.value?.length === 0;
    } else {
      return selectedChoices.value?.length === 0;
    }
  }
});

// Computed property to determine the dynamic button class
const buttonColor = computed(() => {
  return userInput.value.trim() === ""
    ? "bg-gradient-to-r from-gray-500 to-gray-500 text-gray-700 pointer-events-none"
    : "bg-gradient-to-r from-violet-500 to-fuchsia-500";
});

const saveResponse = () => {
  // Object to store the question number and selected choices
  const questionResponse = {
    questionNumber: currentQuestion.value.id,
    choicesIdx: [...selectedChoices.value], // Create a copy of the selected choices
  };
  localStorage.setItem("responses", JSON.stringify(responses.value));
  responses.value.push(questionResponse);
};

// Next and previous question handlers
const nextQuestion = () => {
  localStorage.setItem("name", userInput.value);

  // Check if userInput is empty for input type questions
  if (shouldDisableNextButton.value) {
    showError.value = true;
    setTimeout(() => {
      // Move to the next round after displaying feedback
      showError.value = false;
    }, 1000);
    return;
  }

  if (currentIndex.value <= surveys.value.length - 1) {
    // Save the responses for the current question before clearing selectedChoices
    saveResponse();
    // console.log("question response", responses.value);
    // Clear selectedChoices for the current question when moving to the next question
    selectedChoices.value = [];
    currentIndex.value++;
    currentQuestion.value = surveys.value[currentIndex.value];
  }

  if (currentIndex.value === surveys.value.length - 1) {
    nextQuestionText.value = "Finish Survey";
  }
  if (currentIndex.value === surveys.value.length) {
    finishSurvey();
  }
};

const finishSurvey = () => {
  // Perform any actions needed when finishing the survey
  // For example, save the survey responses or navigate to another page
  // In this case, we navigate to the "riddles" page
  router.push({ name: "riddles" });
};

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentQuestion.value = surveys.value[currentIndex.value];
  }
};
</script>

<style>
#surv {
  /* max-width: 40rem; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>
