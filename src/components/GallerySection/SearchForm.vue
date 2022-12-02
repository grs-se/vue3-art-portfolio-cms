<template>
  <form
    class="flex h-6 w-60 items-center rounded-3xl border border-solid border-brand-gray-3"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="" class="absolute left-0 -top-10">Category</label>
        <text-input placeholder="Location" @handle-input="updateRole" />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchForm",
};
</script>
