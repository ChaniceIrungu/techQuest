<template>
  <div class="flex items-center justify-center">
    <div class="wrapper px-8 bg-blue-300 md:p-8 p-6 border rounded-md">
      <header class="text-lg md:text-xl font-semibold">
        Guess a number from 1 to 100
      </header>
      <p
        class="guess text-lg md:text-lg font-medium"
        :class="guessTextColorClass"
      >
        {{ guessText }}
      </p>
      <div class="input-field flex justify-center gap-4">
        <input
          type="number"
          v-model="inputValue"
          :disabled="gameOver"
          @input="handleInput"
          class="focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        <button
          :class="buttonColor"
          class="border-4 p-2 rounded-md text-white text-lg bg-blue-400"
          @click="checkGuess"
          :disabled="gameOver"
        >
          {{ buttonText }}
        </button>
      </div>
      <p>
        You have
        <span class="chances text-lg md:text-xl font-semibold">{{
          chances
        }}</span>
        chances
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const randomNum = ref(Math.floor(Math.random() * 100));
const chances = ref(10);
const inputValue = ref("");
const guessText = ref("");
const buttonText = ref("Check");
const gameOver = ref(false);

const handleInput = () => {
  guessText.value = "";
};

// onMounted(() => {});
const checkGuess = () => {
  if (gameOver.value) return;
  console.log("number", randomNum.value);
  chances.value--;

  if (inputValue.value == randomNum.value) {
    // If the guess is correct
    guessText.value = "Congratulations!!";
    buttonText.value = "Replay";
    gameOver.value = true;
    // Navigate to the game-over page after a delay
    setTimeout(() => {
      router.push({ name: "tech-quest-end" });
    }, 3000); // Delay in milliseconds (3 seconds)
  } else if (inputValue.value > randomNum.value && inputValue.value < 100) {
    // If the guess is too high
    guessText.value = "Your guess is high";
  } else if (inputValue.value < randomNum.value && inputValue.value > 0) {
    guessText.value = "Your guess is low";
  } else {
    guessText.value = "Your number is invalid";
    // guessText.value = "#DE0611";
  }

  if (chances.value === 0) {
    buttonText.value = "Game Over";
    gameOver.value = true;
    guessText.value = "You lost the game";
    // Navigate to the game-over page after a delay
    setTimeout(() => {
      router.push({ name: "tech-quest-end" });
    }, 3000); // Delay in milliseconds (3 seconds)
  }

  //   if (chances.value < 0) {
  //     window.location.reload();
  //   }
};

// Computed property to determine the dynamic button class
const buttonColor = computed(() => {
  return gameOver.value ? " bg-gray-400" : "bg-blue-400";
});

// Computed property to determine the color class based on the guessText
const guessTextColorClass = computed(() => {
  if (
    guessText.value === "Your guess is high" ||
    guessText.value === "Your guess is low" ||
    guessText.value === "You lost the game"
  ) {
    return "text-red-600"; // Red color for win or loss
  } else {
    return "text-green-600"; // Default color for other messages
  }
});
</script>
<style scoped>
.wrapper .input-field {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 25px 0;
}
.input-field input,
.input-field button {
  height: 50px;
  width: calc(100% / 2 - 20px);
  outline: none;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 18px;
}
.input-field input {
  text-align: center;
  color: #707070;
  width: 110px;
  border: 1px solid #aaa;
}
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  display: none;
}
.input-field input:disabled {
  cursor: not-allowed;
}
.input-field button {
  border: none;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}
.input-field button:active {
  transform: scale(0.97);
}
</style>
