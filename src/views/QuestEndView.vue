<template>
  <div class="flex flex-col justify-center h-screen border-box text-center">
    <div class="mx-auto max-w-full mb-8">
      <p class="text-2xl font-extrabold text-yellow-600">
        Thank you for your participation
        <span class="capitalize text-purple-800"> {{ userName }}</span
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
      <p class="text-2xl font-extrabold text-yellow-600">
        <span class="capitalize text-purple-800"> {{ userName }}</span> !! THE
        TECH SPACE AWAITS YOUR BRILLIANCE
      </p>

      <p class="text-2xl font-extrabold text-purple-600">
        Go forth an Conquer!
      </p>
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
