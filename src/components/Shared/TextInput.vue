<template>
  <input
    type="text"
    class="text-md h-full w-full font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    handleInput($event) {
      this.value = $event.target.value;
      this.$emit("handleInput", this.value);
    },
  },
};
</script>
