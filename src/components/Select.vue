<script setup>
  import { ref } from "@vue/reactivity";
  import { computed, onMounted } from "@vue/runtime-core";

  const props = defineProps(["value", "items"]);
  const emit = defineEmits(["change"]);
  const openPopper = ref(false);
  const defaultLayout = computed(() => {
    let value = props.items.filter((item) => props.value === item.value)[0];
    if (value) {
      return value.layout;
    } else {
      return "Значение неизвестно";
    }
  });

  function setPopper(value) {
    openPopper.value = value;
  }
  function handleChange(value) {
    emit("change", value);
    setPopper(false);
  }
</script>

<template>
  <div class="select_wrapper">
    <div class="custom_select" @click="setPopper(!openPopper)">
      <span class="default_value body1" v-html="defaultLayout"></span>
      <svg
        class="svg_icon"
        :style="{ transform: `rotate(${false ? 0 : 180}deg)` }"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M62.4 744 520 288 968 744Z" />
      </svg>
    </div>
    <div class="popper" v-show="openPopper">
      <div
        class="select_item"
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: item.value === value }"
        @click="handleChange(item.value)"
        v-html="item.layout ? item.layout : null"
      ></div>
    </div>
  </div>
</template>

<style>
  .select_wrapper {
    width: fit-content;
    position: relative;
    cursor: pointer;
  }
  .custom_select {
    width: fit-content;
    min-height: 28px;
    max-width: 99%;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid transparent;
    background-color: transparent;
    padding: 6px 33px 6px 12px;
  }
  .custom_select:hover {
    border: 1px solid #61a375;
  }
  .custom_select .default_value p {
    color: #ffffff;
  }
  .custom_select:hover .default_value p {
    color: #61a375;
  }
  .custom_select:hover svg {
    filter: invert(68%) sepia(18%) saturate(774%) hue-rotate(51deg)
      brightness(92%) contrast(91%);
  }
  .custom_select svg {
    width: 12px;
    height: 12px;
    position: absolute;
    top: calc(50% - 6px);
    right: 12px;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(320deg)
      brightness(104%) contrast(102%);
  }
  .popper {
    width: 100%;
    position: absolute;
    left: 0px;
    top: calc(100% + 10px);
    z-index: 10;
    border-radius: 6px;
    background-color: #ffffff;
    padding: 12px 0px;
  }
  .select_item {
    width: 100%;
    padding: 8px 12px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    cursor: pointer;
    background: transparent;
  }
  .select_item:hover {
    background: #cdcaca54;
  }
  .select_item.active {
    background-color: #61a375;
  }
</style>
