<template>
  <div class="flex flex-col items-center">
    <div class="font-bold">
      Based on your results from the games these are the top roles
    </div>
    <div class="h-96 w-96 text-black">
      <Pie :data="data" :options="options" class="text-black" />
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie } from "vue-chartjs";
import { ref, defineProps, onMounted } from "vue";

const { recommendedRolesArray, pieChartRoles } = defineProps([
  "recommendedRolesArray",
  "pieChartRoles",
]);

const shuffleColors = [
  "#00D8FF",
  "#E46651",
  "#DD1B16",
  "#41B883",
  "#f87979",
  "#E46651",
]; /// Use the shuffled colors array

onMounted(async () => {
  // console.log("chart roles", recommendedRolesArray);
});

ChartJS.register(ArcElement, Tooltip, Legend, Colors);
const data = {
  labels: pieChartRoles.map(
    (role, index) => `${role} (${recommendedRolesArray[index]}%)`
  ),
  datasets: [
    {
      // backgroundColor: Colors,
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
