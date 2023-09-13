<template>
  <transition name="fade" v-if="showTimeUpModal">
    <div class="modal">
      <h2>{{ title }}</h2>
      <p :class="messageTextColor">{{ message }}</p>
      <button class="rounded bg-blue-300 p-2" @click="handleModalOk">OK</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps } from "vue";

const { title, message, showTimeUpModal } = defineProps([
  "title",
  "message",
  "showTimeUpModal",
]);

const emit = defineEmits(["close"]);

const handleModalOk = () => {
  emit("close");
};
</script>

<style>
/* Add your modal styling here */
.modal {
  position: fixed;
  z-index: 1000;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0.6, 0.3, 0.6, 0.6);
}
</style>
