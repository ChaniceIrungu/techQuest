<template>
  <div class="flex flex-col items-center">
    <div class="font-bold">
      Based on your results from the games these are the top roles
    </div>
    <div class="h-96 w-96"><Pie :data="data" :options="options" /></div>
  </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { ref, defineProps, onMounted } from "vue";

const { recommendedRolesArray, pieChartRoles } = defineProps([
  "recommendedRolesArray",
  "pieChartRoles",
]);

onMounted(async () => {
  // console.log("chart roles", recommendedRolesArray);
  shuffle(colors);
});
const colors = [
  "#41B883",
  "#f87979",
  "#E46651",
  "#00D8FF",
  "#DD1B16",
  "#E46651",
]; // Shuffle the colors array

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: pieChartRoles.map(
    (role, index) => `${role} (${recommendedRolesArray[index]}%)`
  ),
  datasets: [
    {
      backgroundColor: [
        "#00D8FF",
        "#E46651",
        "#DD1B16",
        "#41B883",
        "#f87979",
        "#E46651",
      ], /// Use the shuffled colors array
      data: recommendedRolesArray,
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.formattedValue}%`;
        },
      },
    },
  },
};

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
</script>
