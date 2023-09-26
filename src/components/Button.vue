<template>
  <button
    class="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-r hover:from-violet-700 hover:to-fuchsia-700 py-3 px-10 text-white text-lg font-bold capitalize"
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
