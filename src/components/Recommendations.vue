<template>
  <div class="flex flex-col justify-center items-center p-2 m-2">
    <div v-if="showQ2Recs">
      <div class="pb-2 md:pb-10 md:text-lg text-base">
        <p>
          Your current goal is to :

          <span class="font-bold">{{ questionTwoRec?.slug }}</span>
        </p>
        <p>
          Here are some recommendation that would suit you
          <span class="text-xl capitalize font-extrabold">
            {{ userName }}:</span
          >
        </p>
      </div>
      <div class="grid md:flex md:gap-x-4 gap-y-4 place-content-center">
        <div class="max-w-sm rounded overflow-hidden shadow-xl">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">What to Study</div>
            <p class="text-gray-700 text-base">
              {{
                questionTwoRec.recommendations
                  ? questionTwoRec.recommendations.whatToStudy
                  : "No recommendation available"
              }}
            </p>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Type of Course</div>
            <p class="text-gray-700 text-base">
              {{
                questionTwoRec.recommendations
                  ? questionTwoRec.recommendations.course
                  : "No recommendation available"
              }}
            </p>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Where to Find a Job:</div>
            <p class="text-gray-700 text-base">
              {{
                questionTwoRec.recommendations
                  ? questionTwoRec.recommendations.job
                  : "No recommendation available"
              }}
            </p>
          </div>
        </div>
      </div>
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
import recommendations from "../store/recommend.js";
import Chart from "./chart.vue";
import cButton from "./Button.vue";
const emit = defineEmits("openEnd");

const router = useRouter();

const userName = ref("human");
const surveyAnswers = ref([]);
const showQ2Recs = ref(true);
const showTechRoles = ref(false);
const count = ref(0);

const allScores = ref([]);
const riddlesScore = ref(0);
const scrambleScore = ref(0);
const shapesMemoryScore = ref(0);
const colorPaletteScore = ref(0);
const numbersScore = ref(0);

// const roleThresholds = [
//   {
//     name: "UI/UX Designer",
//     threshold: 80,
//     feedback: "You have excellent problem-solving skills and creativity.",
//   },
//   {
//     name: "Front-End Developer",
//     threshold: 75,
//     feedback: "Your design and user interface skills are impressive.",
//   },
//   // Add more roles with thresholds and suitable feedback
//   {
//     name: "DevOps",
//     threshold: 50,
//     feedback: "You show great skill in handling deployment and infrastructure.",
//   },
//   {
//     name: "Data Scientist",
//     threshold: 60,
//     feedback: "Your analytical skills are outstanding.",
//   },
// ];

// Thresholds for recommending roles based on scores
const thresholds = {
  riddles: { "Full Stack Developer": 40, DevOps: 40, "Data Scientist": 60 },
  scramble: {
    "Full Stack Developer": 40,
    "Data Scientist": 60,
    "Back-End Developer": 70,
  },
  shapesMemory: { "Data Scientist": 60, "Data Engineer": 60 },
  numbers: {
    "Back-End Developer": 70,
    "Data Engineer": 70,
    "Full Stack Developer": 40,
  }, // Thresholds for Numbers game
  colorPalette: { "UI/UX Designer": 55, "Front-End Developer": 55 },
};

// Object to store recommended roles and their counts
const recommendedRoles = {
  "Full Stack Developer": 0,
  DevOps: 0,
  "UI/UX Designer": 0,
  "Data Scientist": 0,
  "Data Engineer": 0,
  "Front-End Developer": 0,
  // Define other roles here
};

// Convert recommendedRoles object to an array of key-value pairs
const recommendedRolesArray = computed(() => {
  const rolesCount = Object.values(recommendedRoles);

  const totalCount = rolesCount.reduce((total, count) => total + count, 0);

  const percentages = rolesCount.map((count) =>
    Math.round((count / totalCount) * 100)
  );
  console.log("papa", percentages);

  return percentages;
});
const pieChartRoles = computed(() => {
  const filteredRoles = Object.entries(recommendedRoles)
    .filter(([role, value]) => value !== 0)
    .map(([role]) => role);

  console.log("roleschart", filteredRoles);
  return filteredRoles;
});

onMounted(async () => {
  userName.value = localStorage.getItem("name");

  getGameResults();
  evaluateScores();
});

const getGameResults = () => {
  surveyAnswers.value = JSON.parse(localStorage.getItem("responses"));
  riddlesScore.value = JSON.parse(localStorage.getItem("riddleScore"));
  scrambleScore.value = JSON.parse(localStorage.getItem("scrambleScore"));
  shapesMemoryScore.value = JSON.parse(localStorage.getItem("memoryScore"));
  numbersScore.value = JSON.parse(localStorage.getItem("numbersScore"));
  colorPaletteScore.value = JSON.parse(localStorage.getItem("paletteScore"));
};

// Evaluate scores from different games against the defined thresholds
const evaluateScores = () => {
  evaluateScore(riddlesScore.value, "riddles");
  evaluateScore(scrambleScore.value, "scramble");
  evaluateScore(shapesMemoryScore.value, "shapesMemory");
  evaluateScore(numbersScore.value, "numbers");
  evaluateScore(colorPaletteScore.value, "colorPalette");

  rankRoles();
};

// Compare a score from a specific game against thresholds for different roles
const evaluateScore = (score, game) => {
  for (const role in thresholds[game]) {
    console.log(`score is: ${score} threshold is: ${thresholds[game][role]}.`);
    if (score > thresholds[game][role]) {
      recommendedRoles[role]++;
      console.log(`rRoles2: ${Object.values(recommendedRoles)}\=>${game}.`);
    }
  }
};

// Rank roles based on how frequently they are recommended
const rankRoles = () => {
  sortedRoles.value = Object.keys(recommendedRoles).sort((a, b) => {
    return recommendedRoles[b] - recommendedRoles[a];
  });

  console.log("Ranked Roles:", sortedRoles.value);
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
  "Data Engineer":
    "You demonstrated skills related to data processing and management.",
  "Front-End Developer":
    "Your performance indicates a good grasp of front-end development concepts.",
  // Add feedback for other roles here
};

const questionTwoRec = computed(() => {
  const responseWithQuestion2 = surveyAnswers.value.find(
    (answer) => answer.questionNumber === 2
  );

  if (responseWithQuestion2) {
    return responseWithQuestion2.choicesIdx[0].attributes;
  }

  // If there's no response for question number 2 or it doesn't match the format, return null or handle as needed
  return {};
});
const questionSevenTech = computed(() => {
  const responseWithQuestion7 = surveyAnswers.value.find(
    (answer) => answer.questionNumber === 7
  );

  if (responseWithQuestion7) {
    return responseWithQuestion7.choicesIdx[0].attributes;
  }

  // If there's no response for question number 2 or it doesn't match the format, return null or handle as needed
  return {};
});

const nextRecommendation = () => {
  showQ2Recs.value = !showQ2Recs.value;
  showTechRoles.value = !showTechRoles.value;
  // emit("openEnd");
};
</script>
