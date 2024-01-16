<template>
  <button
    class="rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:bg-gradient-to-r hover:from-blue-800 hover:to-green-700 py-3 px-10 text-white text-lg font-bold capitalize"
  >
    {{ buttonText }}
  </button>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps(["buttonText", "disableColor"]);
</script>
