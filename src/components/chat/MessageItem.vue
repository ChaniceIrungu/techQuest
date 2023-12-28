<template>
  <div
    :class="{
      'flex p-2 mt-2': true,
      'items-end pr-2': sentByCurrentUser,
      'items-start pl-2': !sentByCurrentUser,
      'justify-end ': sentByCurrentUser,
    }"
  >
    <!-- <p class="text-blue-600">
      msg from: <span class="text-yellow-600">{{ sender }}</span>
    </p> -->
    <div
      :class="{
        'flex items-center font-helvetica text-gray-600 tracking-wider': true,
        'justify-end pr-2': sentByCurrentUser, // Align to right if sent by current user
        'justify-start pl-2': !sentByCurrentUser, // Align to left if not sent by current user
      }"
    >
      <p class="text-yellow-600">{{ sender }}:</p>
    </div>
    <div
      :class="{
        'p-2  rounded-lg': true,
        'bg-fuchsia-500 text-white': sentByCurrentUser,
        'bg-gray-200 text-black': !sentByCurrentUser,
      }"
    >
      <p>
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, onMounted, ref } from "vue";

const { message, sender } = defineProps(["message", "sender"]);

const username = ref("");
const userData = ref({});

onMounted(() => {
  userData.value = JSON.parse(window.localStorage.getItem("userData"));
  username.value = userData.value.username;
  //   console.log(`sender ${sender},username :${username.value} `);
});

const sentByCurrentUser = computed(() => sender === username.value);
</script>
