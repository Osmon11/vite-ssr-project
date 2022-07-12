<script setup>
  import { computed } from "vue";
  const props = defineProps(["item", "number", "activeNumber"]);
  const emit = defineEmits(["toggleItem"]);
  let active = computed(() => props.activeNumber === props.number),
    paddingBottom = computed(() => `${active.value ? 15 : 0}px`),
    transform = computed(() => `rotate(${active.value ? 0 : 180}deg)`);

  const toggleActive = () => {
    emit("toggleItem", active.value ? 0 : props.number);
  };
</script>

<template>
  <div class="accordeon-item">
    <div class="item-wrapper flex-box" @click="toggleActive">
      <svg
        class="svg-icon"
        :style="{ transform }"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M62.4 744 520 288 968 744Z" />
      </svg>
      <div class="summary">{{ item.summary }}</div>
    </div>
    <div
      class="details collapse"
      :style="{ paddingBottom }"
      :data-expanded="active"
      v-html="item.details"
    ></div>
  </div>
</template>

<style scoped>
  .accordeon-item {
    width: 100%;
    height: fit-content;
    padding: 0px 15px;
    border-bottom: 1px solid #d4d4d4;
  }
  .item-wrapper {
    cursor: pointer;
    gap: 7px;
  }
  .summary {
    font-weight: 700;
    line-height: 20px;
    color: #47425d;
    margin: 0;
    padding: 15px 0px;
    outline: none;
  }
  .details {
    height: fit-content;
  }
</style>
