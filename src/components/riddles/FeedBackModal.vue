<template>
  <transition
    name="fade"
    v-if="showFeedBackModal"
    @after-leave="handleModalHidden"
  >
    <div class="modal rounded border-box">
      <div class="w-[140px] h-[120px] flex items-center">
        <p class="text-lg font-medium font-serif" :class="messageTextColor">
          {{ message }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps } from "vue";

const { message, showFeedBackModal, messageTextColor } = defineProps([
  "message",
  "showFeedBackModal",
  "messageTextColor",
]);

const emit = defineEmits(["close"]);

const handleModalHidden = () => {
  showFeedBackModal.value = false;
};
</script>

<style>
/* Add your modal styling here */
.modal {
  position: fixed;
  top: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0.6, 0.3, 0.6, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
