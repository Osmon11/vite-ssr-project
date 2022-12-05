<template>
  <div
    class="flex-box-center my-4"
    v-if="props.loading"
  >
    <v-progress-circular
      :size="50"
      color="secondary"
      indeterminate
    ></v-progress-circular>
  </div>
  <div
    class="flex-box-center my-4"
    v-else-if="props.noData"
  >
    <p class="body1">
      {{ $t(props.noDataText) }}
    </p>
  </div>
  <slot v-else></slot>
</template>

<script lang="ts" setup>
  const props = defineProps({
    loading: { type: Boolean, default: false },
    noData: { type: Boolean, default: false },
    noDataText: {
      type: String,
      default:
        "lang-7e1726f3-1359-4314-be78-23d8e5610af3",
    },
  });
</script>
