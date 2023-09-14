<template>
  <div class="flex flex-col items-center">
    <p class="pt-16 font-bold text-xl">
      You got
      <span class="text-[#0eff01] font-bold">{{ correct || 0 }}</span> correct
    </p>
    <p class="pt-2 font-bold text-xl">
      You got
      <span class="text-[#ff0901] font-bold">{{ wrong || 0 }}</span> wrong
    </p>
    <p class="pt-2 font-bold text-xl">
      Your score :
      <span class="text-[#FFB801] font-bold">{{ score || 0 }}</span>
    </p>
    <div>
      <h1 class="pt-32 text-center text-xl font-bold">
        {{ feebackMessage }}
      </h1>
    </div>
    <div class="pt-32 flex flex-col items-center">
      <h1 class="text-center text-xl font-bold">Come on! You can do it!</h1>
      <div class="pt-4 md:pt-8 text-center">
        <button
          @click="goToOtherPage()"
          class="bg-[#d1951d] hover:bg-[#b99c28] text-white font-bold py-3 px-10 rounded-full"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { score, correct, wrong, feebackMessage } = defineProps([
  "score",
  "correct",
  "wrong",
  "feebackMessage",
]);

const goToOtherPage = () => {
  router.push({ name: "tech-quest-end" });
};
</script>
