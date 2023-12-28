<template>
  <p>Thank you for registering</p>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const urlParams = new URLSearchParams(window.location.search);
const confirmationCode = urlParams.get("confirmation");

const confirmUser = async (confirmationCode) => {
  try {
    const response = await axios.get(
      `/confirm-user?confirmationCode=${confirmationCode}`
    );
    console.log(response.data); // Handle successful confirmation
    // Redirect or handle the confirmed user logic
  } catch (error) {
    console.error("Error confirming user:", error);
    // Handle error response or display error to the user
  }
};

// Call the confirmUser function passing the extracted confirmation code
confirmUser(confirmationCode);
</script>
