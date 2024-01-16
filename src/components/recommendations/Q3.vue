<template>
  <div class="pb-2 md:pb-3 md:text-lg text-base pt-4 md:pt-8">
    <p class="text-white font-extrabold">
      Tech Challenges That Bother You Most
    </p>
  </div>
  <div class="grid md:flex md:gap-x-2 gap-y-4 place-content-center">
    <div
      class="max-w-sm rounded overflow-hidden shadow-xl"
      v-for="(recommendation, index) in questionThreeRec"
      :key="index"
    >
      <div class="px-6 py-4 bg-white text-black">
        <span class="font-bold text-xl border rounded-full px-2"
          >{{ index + 1 }}.
        </span>
        <div class="font-bold text-xl mb-2">
          {{ recommendation.attributes.choice }}
        </div>
        <p class="text-base">
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
