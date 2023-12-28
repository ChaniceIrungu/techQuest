<template>
  <div v-for="(item, index) in messages" :key="index" class="border-2">
    <div key="index">
      <MessageItem :message="item.message" :sender="item.user" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import MessageItem from "./MessageItem.vue";
// import MessagesItem from "../components/chat/Messages.vue";
const { messages } = defineProps(["messages"]);
</script>
