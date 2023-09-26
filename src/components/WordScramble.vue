<template>
  <div class="container">
    <h2>Word Scramble</h2>
    <div class="content">
      <p class="word"></p>
      <div class="details">
        <p class="hint">Hint: <span></span></p>
        <p class="time">
          Time Left: <span><b>30</b>s</span>
        </p>
      </div>
      <input type="text" spellcheck="false" placeholder="Enter a valid word" />
      <div class="buttons">
        <button
          class="refresh-word bg-green-500 hover:bg-grey-700 rounded py-2 px-20 text-white text-lg font-bold capitalize"
        >
          Refresh Word
        </button>
        <button
          class="check-word bg-blue-500 hover:bg-blue-700 rounded py-4 px-20 text-white text-lg font-bold capitalize"
        >
          Check Word
        </button>
      </div>
    </div>
  </div>
</template>
