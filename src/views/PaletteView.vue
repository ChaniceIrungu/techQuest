<template>
  <div class="flex items-center justify-center">
    <div v-if="!menuOpen" class="flex items-center flex-col">
      <h1 class="text-3xl font-semibold mb-3 text-blue-600">
        Color Palette Game
      </h1>
      <div class="pb-4 md:pb-8">
        <img src="/color_palette_game.png" class="" />
      </div>
      <div class="pb-2 text-blue-600">
        <p>
          In this color palette game, you will be tasked with creating a color
          palette for a website design
        </p>
        <p>
          You will need to need to match a particular set of colors to the
          particular website theme given.
        </p>
      </div>
      <cButton :buttonText="' Start'" @click="startColorPalette" />
    </div>
    <ColorPalette v-if="isColorPaletteOpen" />
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import ColorPalette from "../components/ColorPalette.vue";
import cButton from "../components/Button.vue";

const menuOpen = ref(false);
const isColorPaletteOpen = ref(false);

const startColorPalette = () => {
  isColorPaletteOpen.value = true;
  menuOpen.value = !menuOpen.value;
};
</script>
