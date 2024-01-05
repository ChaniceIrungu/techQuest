<template>
  <div class="h-full text-center md:pb-2 pb-12">
    <div class="w-full p-2">
      <div class="pb-2">
        <div class="font-bold">Progress</div>

        <div
          class="p-1 border-1 border-yellow-700 rounded-full bg-gray-200 px-4"
        >
          <div
            :style="{ width: progressBarWidth }"
            class="rounded-full bg-fuchsia-600 text-white h-6"
          >
            {{ currentIndex + 1 }}/{{ surveys.length }}
          </div>
          <!-- Loader -->
          <LoadingAnimation v-if="isLoading" message="Loading" />
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
              class="input p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-black"
              name=""
              placeholder="Enter preferred name"
              v-model="userInput"
            />
          </div>

          <div
            v-else
            class="cursor-pointer"
            v-for="(choice, key) in currentQuestion.attributes.survey_options
              .data"
            :key="key"
          >
            <div
              class="customT py-2 text-left"
              :style="{ 'animation-delay': `${key * 0.2}s` }"
              :key="choice.id"
            >
              <label
                class="flex items-center space-x-4 border-2 rounded p-2 hover:bg-blue-200 cursor-pointer"
              >
                <input
                  :type="
                    currentQuestion.attributes.multiple ? 'checkbox' : 'radio'
                  "
                  :checked="isSelected(choice)"
                  @change="updateSelectedChoices(key, choice)"
                  class="rounded-full h-4 w-4"
                />
                <span class="p-0.5 md:p-2">{{ choice.attributes.choice }}</span>
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
import LoadingAnimation from "../components/LoadingAnimation.vue";

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
const isLoading = ref(false);

// fetch survey data
const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/surveys?populate=*`
    );
    surveys.value = res.data.data;
    currentQuestion.value = surveys.value[currentIndex.value];
    // Handle loading completion e.g update UI
  } catch (error) {
    console.error("Error fetching surveys:", error);
    // Handle errors here
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
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
const isSelected = (choice) => {
  if (selectedChoices.value.length) {
    return selectedChoices.value.includes(choice);
  }
};

// Function to update selectedChoices array
const updateSelectedChoices = (index, input) => {
  // const currentIndexValue = currentIndex.value;
  const choices = selectedChoices.value;

  // If it's a multiple-choice question, toggle selection
  if (currentQuestion.value.attributes.multiple) {
    const choiceIndex = choices.indexOf(input);
    // If the choice is not already selected (not found in the array)
    if (choiceIndex === -1) {
      choices.push(input);
    } else {
      // If the choice is already selected (found in the array)
      choices.splice(choiceIndex, 1);
    }
  } else {
    // For single-choice questions, replace the selection
    choices.length = 0; // Clear the array
    choices.push(input); // Add the new selections
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

  responses.value.push(questionResponse);
  localStorage.setItem("responses", JSON.stringify(responses.value));
  // console.log("questionResponse", responses.value);
};

// Next and previous question handlers
const nextQuestion = () => {
  localStorage.setItem("name", userInput.value);

  // console.log("surv options:", currentQuestion.value.attributes.survey_options);

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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.customT {
  animation-name: customT;
  animation-duration: 1s;
}

@keyframes customT {
  from {
    transform: translateY(10px);
  }
  to {
    /* transform: translateY(0px); */
  }
}
</style>
