<template>
  <input
    type="text"
    class="text-md h-full w-full font-normal focus:outline-none"
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>

<script>
import nextElementInList from "@/utils/nextElementInList";

export default {
  name: "TextInput",
  data() {
    return {
      value: "",
      placeholder: "Painting",
      interval: null,
    };
  },
  created() {
    this.changePlaceholder();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    handleInput($event) {
      this.value = $event.target.value;
      this.$emit("handleInput", this.value);
    },
    changePlaceholder() {
      this.interval = setInterval(() => {
        const placeholders = ["Painting", "Winchester", "2022", "Imagination"];
        this.placeholder = nextElementInList(placeholders, this.placeholder);
      }, 2000);
    },
  },
};
</script>
