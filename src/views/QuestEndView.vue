<template>
  <div class="flex flex-col justify-center border-box text-center md:py-8 py-2">
    <ThanksMessage v-if="openEnd" />
    <Recommendations
      v-if="showRecommendation"
      @openEnd="closeRecommendation()"
    />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import ThanksMessage from "../components/ThankYou.vue";
import Recommendations from "../components/Recommendations.vue";
const imageSrc = ref("/riddle.jpg");
const router = useRouter();
import { useRouter } from "vue-router";

const userName = ref("Human");

onMounted(async () => {
  userName.value = localStorage.getItem("name");
  // console.log(userName.value);
});
const openEnd = ref(false);
const showRecommendation = ref(true);

const closeRecommendation = () => {
  openEnd.value = true;
  showRecommendation.value = !showRecommendation.value;
};
</script>
