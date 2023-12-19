<template>
  <div
    class="flex items-center justify-between bg-blue-500 rounded-t-lg h-16 w-full"
  >
    <div class="flex items-center flex-1 ml-5 text-white">
      <div class="text-green-500 mr-2">
        <i class="fa fa-circle" aria-hidden="true"></i>
      </div>
      <div>{{ room }}</div>
    </div>
    <div class="mr-5">
      <a href="/">
        <div class="text-white text-2xl">
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  room: String,
});
</script>
