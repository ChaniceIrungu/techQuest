<template class="text-black font-bold">
  <!-- Flex box -->
  <div
    className="flex items-center min-h-screen p-4 bg-red-100 lg:justify-center"
  >
    <div
      className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
    >
      Hello you
    </div>
  </div>

  <!-- todo -->
  <h1><mark>My todo task list</mark></h1>
  <div v-for="todo in todos">
    <li v-if="!todo.isComplete">
      {{ todo.task }}
    </li>
  </div>
  <div class="text-black font-bold pt-5">
    <p>Message is: {{ message }}</p>
    <input type="text" v-model="message" placeholder="edit me" />
  </div>

  <div>Checked items: {{ checkedItems }}</div>
  <div class="text-black font-bold pt-5">
    <input type="checkbox" id="checkbox" v-model="checkedItems" />
    <label for="checkbox">{{ checked }}</label>
  </div>

  <input type="checkbox" id="john" value="John" v-model="checkedItems" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedItems" />
  <label for="mike">Mike</label>

  <br />
  <!-- <input type="radio" id="one" value="One" v-model="checkedItems" />
  <label for="one">One</label> -->
  <br />

  <mark>dynamically render select option</mark>
  <br />
  <select v-model="selected" class="mt-4">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>

  <div>Selected: {{ selected }}</div>

  <!-- Use this to pass props to a component -->
  <!-- <MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/> -->
</template>
<script setup>
import { ref } from "vue";
const items = [{ message: "topic 1" }, { message: "topic 2" }];
const todos = [
  { task: "task 1", isComplete: false },
  { task: "topic 2", isComplete: true },
];

const checked = "the task is this";

const checkedItems = ref([]);

const selected = ref("A");

const options = ref([
  { text: "One", value: "A" },
  { text: "Two", value: "B" },
  { text: "Three", value: "C" },
]);
</script>
