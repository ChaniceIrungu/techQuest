<template>
  <div class="text-center">
    <div class="w-full p-2">
      <div class="pb-2">
        <div>Progress</div>

        <div
          class="p-1 border-1 border-yellow-700 rounded-full bg-yellow-600 text-white"
        >
          {{ currentIndex + 1 }}/{{ surveys.length }}
        </div>
      </div>

      <!-- Survey goes here -->
      <div id="surv" class="bg-[#F3F3F3] border border-rounded-md my-4">
        <div class="p-4" v-if="currentQuestion">
          <p class="font-bold md:text-2xl text-xl">
            {{ currentQuestion.attributes.question }}
          </p>
          <div class="p-4" v-if="currentQuestion.attributes.type === 'input'">
            <input
              type="text"
              class="input p-2"
              name=""
              placeholder="Enter preferred name"
              v-model="userInput"
            />
          </div>
          <div v-else>
            <div
              class="py-2 text-left"
              v-for="(choice, key) in currentQuestion.attributes.choices"
              :key="key"
            >
              <div
                class="flex items-center space-x-2 border-2 rounded p-2 hover:bg-yellow-200"
              >
                <input
                  type="checkbox"
                  :id="key"
                  :value="choice"
                  v-model="selectedChoices"
                  class="rounded-full text-blue-600 focus:ring-blue-400 h-4 w-4"
                />
                <label :for="key" class="text-gray-800">{{ choice }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end survey -->
      <div class="mt-4 inline">
        <button
          class="bg-yellow-500 hover:bg-yellow-700 p-3 rounded-full"
          @click="nextQuestion"
          :disabled="shouldDisableNextButton"
          :class="{ 'bg-gray-300': shouldDisableNextButton }"
        >
          {{ nextQuestionText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import axios from "axios";

const surveys = ref([]);
const currentIndex = ref(0);
const userInput = ref("");
const currentQuestion = ref(null);
const nextQuestionText = ref("Next Question");
const selectedChoices = ref([]);
const router = useRouter();

// Fetch the survey data
onMounted(async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/surveys?populate=*`
  );
  surveys.value = res.data.data;
  currentQuestion.value = surveys.value[currentIndex.value];
});

// Add a computed property to check if userInput is empty
const shouldDisableNextButton = computed(() => {
  // Check if userInput is empty and the question type is 'input'
  return userInput.value.trim() === "";
});

// Next and previous question handlers
const nextQuestion = () => {
  localStorage.setItem("name", userInput.value);

  // Check if userInput is empty for input type questions
  if (shouldDisableNextButton.value) {
    // You can display an error message or handle it as needed
    return;
  }

  if (currentIndex.value <= surveys.value.length - 1) {
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
