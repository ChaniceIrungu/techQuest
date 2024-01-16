<template>
  <div class="pb-2 md:pb-8 md:text-lg text-base">
    <p class="underline">
      Your goal is to:

      <span class="font-bold">{{ questionTwo?.slug }}</span>
    </p>
    <p>
      Here are some recommendation that would suit you
      <span class="text-xl capitalize font-extrabold text-fuchsia-500">
        {{ userName }}:</span
      >
    </p>
  </div>
  <div class="grid md:flex md:gap-x-4 gap-y-4 place-content-center">
    <div class="max-w-sm rounded overflow-hidden shadow-xl bg-white">
      <div class="px-6 py-4 text-black">
        <div class="font-bold text-xl mb-2">What to Study</div>
        <p class="text-base">
          {{
            questionTwo.recommendations
              ? questionTwo.recommendations.whatToStudy
              : "No recommendation available"
          }}
        </p>
      </div>
    </div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div class="px-6 py-4 text-black">
        <div class="font-bold text-xl mb-2">Type of Course</div>
        <p class="text-base">
          {{
            questionTwo.recommendations
              ? questionTwo.recommendations.course
              : "No recommendation available"
          }}
        </p>
      </div>
    </div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div class="px-6 py-4 text-black">
        <div class="font-bold text-xl mb-2">Where to Find a Job:</div>
        <p class="text-base">
          {{
            questionTwo.recommendations
              ? questionTwo.recommendations.job
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
const { questionTwo } = defineProps(["questionTwo"]);

onMounted(async () => {
  userName.value = localStorage.getItem("name");
});

const goToOtherPage = () => {
  router.push({ name: "guess-number" });
};
</script>
