<template>
  <div class="pb-2 md:pb-3 md:text-lg text-base pt-4 md:pt-8">
    <p class="text-black font-extrabold underline">
      Tech Challenges That Bother You Most
    </p>
  </div>
  <div class="grid md:grid-cols-3 md:gap-x-2 gap-y-4">
    <div
      class="max-w-sm rounded overflow-hidden shadow-xl"
      v-for="(recommendation, index) in questionThreeRec"
      :key="index"
    >
      <div class="px-6 py-4">
        <span class="font-bold text-xl text-fuchsia-500">{{ index }} </span>
        <div class="font-bold text-xl mb-2">
          {{ recommendation.attributes.choice }}
        </div>
        <p class="text-gray-700 text-base">
          {{
            recommendation.attributes.recommendations.whatToDo
              ? recommendation.attributes.recommendations.whatToDo
              : "No recommendation available"
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
const userName = ref("human");
const router = useRouter();
const { questionThreeRec } = defineProps(["questionThreeRec"]);

onMounted(async () => {
  userName.value = localStorage.getItem("name");
  console.log(questionThreeRec);
});

const goToOtherPage = () => {
  router.push({ name: "guess-number" });
};
</script>
