<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <a href="" class="flex items-center h-full text-xl">{{ title }}</a>

        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              data-test="main-nav-list-item"
              class="h-full ml-9 first:ml-0"
            >
              <a href="" class="flex items-center h-full py-2 5">{{
                menuItem
              }}</a>
            </li>
          </ul>
        </nav>

        <div class="flex items-center h-full ml-auto">
          <hamburger-menu />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HamburgerMenu from "@/components/HamburgerMenu.vue";

export default {
  name: "MainNav",
  components: {
    HamburgerMenu,
  },
  data() {
    return {
      title: "George Rice-Smith",
      menuItems: [
        "Portfolio",
        "Research",
        "Writing",
        "Exhibitions",
        "About",
        "Statement",
        "Contact",
      ],
    };
  },
};
</script>
