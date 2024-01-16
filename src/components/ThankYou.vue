<template>
  <div class="flex flex-col justify-center border-box text-center md:py-8 py-2">
    <div class="mx-auto max-w-full mb-8">
      <p class="text-2xl font-extrabold text-white">
        Thank you for your participation
        <span class="capitalize text-sky"> {{ userName || "Human" }}</span
        >!!
      </p>
    </div>
    <div class="video-container">
      <!-- Add the video element -->
      <video
        class="video block mx-auto max-w-full"
        width="200"
        height="200"
        autoplay
        loop
        muted
      >
        <source src="/congratulations.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="mx-auto max-w-full mt-4 text-center">
      <p class="text-2xl font-extrabold text-white">
        <span class="capitalize text-sky"> {{ userName }}</span> !! THE TECH
        SPACE AWAITS YOUR BRILLIANCE
      </p>

      <p class="text-2xl font-extrabold text-sky">Go forth and Conquer!</p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
const imageSrc = ref("/riddle.jpg");
const router = useRouter();
import { useRouter } from "vue-router";

const userName = ref("Human");

onMounted(async () => {
  userName.value = localStorage.getItem("name");
  console.log(userName.value);
});
</script>
