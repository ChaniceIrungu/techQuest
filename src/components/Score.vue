<template>
  <div id="user-progress " class="mt-2">
    <div class="levels">
      LEVEL: <span>{{ level }}</span>
    </div>
    <div class="scores">
      SCORE: <span>{{ score }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Store from "../store/index.js"; // Import your store path here

const props = defineProps(["level", "score"]);
</script>

<style>
#user-progress {
  font-size: 22px;
}
#user-progress span {
  font-weight: bold;
}
.levels {
  /* float: right; */
}
.scores {
  /* float: left; */
}
</style>
