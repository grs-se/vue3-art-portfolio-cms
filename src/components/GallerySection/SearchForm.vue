<template>
  <form
    class="flex h-6 w-60 items-center justify-center rounded-3xl border border-solid border-brand-gray-3"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="" class="absolute left-0 -top-10">Category</label>
        <text-input placeholder="Location" @handle-input="updateRole" />
      </div>
    </div>

    <action-button
      text="Search"
      type="secondary"
      class="flex items-center rounded-r-3xl"
    />
  </form>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";
export default {
  name: "SearchForm",
  components: { ActionButton, TextInput },
};
</script>
