<template>
  <div class="pb-2 md:pb-10 md:text-lg text-base pt-4">
    <p>
      Tech Challenges That Bother You Most:

      <span class="font-bold">{{ questionThreeRec?.choice }}</span>
    </p>
    <p>
      Here is a recomendation for you
      <span class="text-xl capitalize font-extrabold text-fuchsia-500">
        {{ userName }}:</span
      >
    </p>
  </div>
  <div class="grid md:flex md:gap-x-4 gap-y-4 place-content-center">
    <div class="max-w-sm rounded overflow-hidden shadow-xl">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">What to do</div>
        <p class="text-gray-700 text-base">
          {{
            questionThreeRec.recommendations
              ? questionThreeRec.recommendations.whatToDo
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
});

const goToOtherPage = () => {
  router.push({ name: "guess-number" });
};
</script>
