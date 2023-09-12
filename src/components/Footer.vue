<template>
  <nav class="">
    <div class="mx-auto px-2 sm:px-6 lg:px-8 bg-yellow-600">
      <div class="flex h-16 items-left justify-between">
        <div class="flex flex-1 items-center md:justify-left">
          <div class="flex space-x-4">
            <a
              v-for="item in navigation"
              href="#"
              :key="item.name"
              class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >{{ item.name }}</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
  </nav>
</template>

<script setup>
import { ref } from "vue";

const mobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const navigation = [
  { name: "contacts", href: "#", current: false },
  { name: "location", href: "#", current: false },
  { name: "Privacy", href: "#", current: false },
];
</script>
