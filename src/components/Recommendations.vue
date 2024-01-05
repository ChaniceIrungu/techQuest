<template>
  <div class="flex flex-col justify-center items-center p-2 m-2">
    <div v-if="showQ2Recs">
      <q2Component :questionTwo="questionTwoRec" />
      <q3Component :questionThreeRec="questionThreeRec" />
      <q4Component :questionFourRec="questionFourRec" />
    </div>

    <div v-if="showTechRoles">
      <div class="pb-2 md:pb-14 md:text-lg text-base">
        <p>Your interests in tech are most in the following areas:</p>
        <div class="flex flex-col items-center pb-4">
          <div
            class="flex place-content-center px-4"
            v-for="(role, key) in questionSevenTech.techRole"
            :key="key"
          >
            <div class="max-w-sm rounded overflow-hidden shadow-xl">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Role:</div>
                <p class="text-gray-700 text-base">
                  {{ role }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <hr />
        <div class="p-2">
          <p class="font-bold">
            However here are some recommendations in hierarchy of your
            performance:
          </p>
          <p class="text-sm pt-2">
            Note that, you can still pursue a career in your desired field and
            that this should only be a motivation to improve your skills in the
            areas that you are interested in
          </p>
        </div>

        <hr />
        <hr />
        <ul class="text-base md:text-lg">
          <li v-for="(role, index) in sortedRoles" :key="index" class="p-2">
            <span class="font-bold">{{ index + 1 }}.</span>
            <span class="font-bold">{{ role }}</span>
            <p v-if="roleFeedback[role]">{{ roleFeedback[role] }}</p>
          </li>
        </ul>

        <Chart
          :recommendedRolesArray="recommendedRolesArray"
          :pieChartRoles="pieChartRoles"
        />
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
import q2Component from "../components/recommendations/Q2.vue";
import q3Component from "../components/recommendations/Q3.vue";
import q4Component from "../components/recommendations/Q4.vue";
import recommendations from "../store/recommend.js";
import Chart from "./chart.vue";
import cButton from "./Button.vue";
const emit = defineEmits("openEnd");

const router = useRouter();

const userName = ref("human");
const surveyAnswers = ref([]);
const showQ2Recs = ref(true);
const showTechRoles = ref(false);

const gameScores = {};
const totalCalculatedScores = ref({});

onMounted(async () => {
  userName.value = localStorage.getItem("name");
  getGameResults();
  rankRoles();
});

const calculateRoleScores = (gameScores, selectedRole) => {
  const roleScores = {};

  // Calculate game scores contribution to roles
  for (const gamePlayed in gameScores) {
    const userScore = gameScores[gamePlayed];
    for (const techRole in thresholds[gamePlayed]) {
      const threshold = thresholds[gamePlayed][techRole];

      // Initializes the score for each role in the roleScores object if it's not yet defined.
      if (!roleScores[techRole]) {
        roleScores[techRole] = 0;
      }

      // if the user's score meets or exceeds the threshold, it assigns a full score of threshold.
      const aggregateScore = userScore >= threshold ? threshold : 0; // Adjust based on proportion to threshold
      roleScores[techRole] += aggregateScore;
    }
  }

  // Add survey response contribution to roles
  roleScores[selectedRole] = roleScores[selectedRole]
    ? roleScores[selectedRole] + 15
    : 0;
  totalCalculatedScores.value = roleScores;
  // console.log("aggregateScore33", roleScores);
};

// Thresholds for recommending roles based on scores
const thresholds = {
  riddles: {
    "Full Stack Developer": 30,
    DevOps: 15,
    "Data Scientist": 20,
    "Back-End Developer": 20,
    "Front-End Developer": 0,
    "UI/UX Designer": 0,
  },
  scramble: {
    "Full Stack Developer": 15,
    DevOps: 0,
    "Data Scientist": 20,
    "Back-End Developer": 0,
    "Front-End Developer": 25,
    "UI/UX Designer": 30,
  },
  shapesMemory: {
    "Full Stack Developer": 20,
    DevOps: 30,
    "Data Scientist": 0,
    "Back-End Developer": 0,
    "Front-End Developer": 20,
    "UI/UX Designer": 15,
  },
  numbers: {
    "Full Stack Developer": 20,
    DevOps: 15,
    "Data Scientist": 30,
    "Back-End Developer": 20,
    "Front-End Developer": 0,
    "UI/UX Designer": 0,
  }, // Thresholds for Numbers game
  colorPalette: {
    "Full Stack Developer": 20,
    DevOps: 0,
    "Data Scientist": 10,
    "Back-End Developer": 0,
    "Front-End Developer": 25,
    "UI/UX Designer": 30,
  },
};

// Convert recommendedRoles object to an array of key-value pairs
const recommendedRolesArray = computed(() => {
  const totalTimesRecommended = Object.values(totalCalculatedScores.value);
  return totalTimesRecommended;
});

const pieChartRoles = computed(() => {
  const filteredRoles = Object.entries(totalCalculatedScores.value)
    .filter(([role, value]) => value !== 0 && !isNaN(value))
    .map(([role]) => role);

  // console.log("roleschart", filteredRoles);
  return filteredRoles;
});

const getGameResults = () => {
  gameScores.value = {
    riddles: JSON.parse(localStorage.getItem("riddleScore")) || 0,
    scramble: JSON.parse(localStorage.getItem("scrambleScore")),
    shapesMemory: JSON.parse(localStorage.getItem("memoryScore")),
    numbers: JSON.parse(localStorage.getItem("numbersScore")),
    colorPalette: JSON.parse(localStorage.getItem("paletteScore")),
  };
  //selected Role
  surveyAnswers.value = JSON.parse(localStorage.getItem("responses"));
  calculateRoleScores(gameScores.value, questionSevenTech.value.techRole);
  console.log(" gameScores.value", gameScores.value);
};

// Rank roles based on how frequently they are recommended
const rankRoles = () => {
  sortedRoles.value = Object.keys(totalCalculatedScores.value).sort((a, b) => {
    return totalCalculatedScores.value[b] - totalCalculatedScores.value[a];
  });

  // console.log("Ranked Roles:", sortedRoles.value);
  return sortedRoles.value;
};

// Get the sorted roles to display in the template
const sortedRoles = ref([]);

// Object to store feedback for each role
const roleFeedback = {
  "Full Stack Developer":
    "You showed strong problem-solving skills and an ability to handle various aspects of development.",
  DevOps:
    "Your scores indicate a proficiency in understanding infrastructure and deployment strategies.",
  "UI/UX Designer":
    "Your scores suggest a good understanding of design principles and user experience.",
  "Data Scientist":
    "Your scores show an analytical mindset and ability to work with complex data.",
  "Back-End Engineer":
    "You demonstrated skills related to data processing and management.",
  "Front-End Developer":
    "Your performance indicates a good grasp of front-end development concepts.",
  // Add feedback for other roles here
};

const questionTwoRec = computed(() => {
  const responseWithQuestion2 = surveyAnswers.value.find(
    (answer) => answer.questionNumber === 2
  );
  // return null or handle as needed if dont exist
  return responseWithQuestion2
    ? responseWithQuestion2.choicesIdx[0].attributes
    : {};
});

const questionThreeRec = computed(() => {
  const questionThree = surveyAnswers.value.find(
    (answer) => answer.questionNumber === 3
  );

  // Loop through choicesIdx array and extract choice indices
  // const choiceIndices = questionThree.choicesIdx.map((choice) => choice);

  console.log("questionThree", questionThree);
  // return null or handle as needed if dont exist
  return questionThree ? questionThree.choicesIdx : [];
});

const questionFourRec = computed(() => {
  const questionFour = surveyAnswers.value.find(
    (answer) => answer.questionNumber === 4
  );
  // return null or handle as needed if dont exist
  return questionFour ? questionFour.choicesIdx[0].attributes : {};
});

const questionSevenTech = computed(() => {
  const responseWithQuestion7 = surveyAnswers.value.find(
    (answer) => answer.questionNumber === 7
  );

  if (responseWithQuestion7) {
    return responseWithQuestion7.choicesIdx[0].attributes;
  }
  // If there's no response for question number 7 or it doesn't match the format, return null or handle as needed
  return {};
});

const nextRecommendation = () => {
  showQ2Recs.value = !showQ2Recs.value;
  showTechRoles.value = !showTechRoles.value;
  // emit("openEnd");
};
</script>
