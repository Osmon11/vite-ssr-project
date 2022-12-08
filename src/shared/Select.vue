<script setup>
  import { ref } from "@vue/reactivity";
  import { computed, onMounted } from "@vue/runtime-core";

  const props = defineProps(["value", "items"]);
  const emit = defineEmits(["change"]);
  const openPopper = ref(false);

  function setPopper(value) {
    openPopper.value = value;
  }
  function handleChange(value) {
    emit("change", value);
    setPopper(false);
  }
  function checkTargetClick(event) {
    if (event.target.classList.value !== "overlay") {
      event.preventDefault(); //prevent default DOM action
      event.stopPropagation(); //stop bubbling
    }
  }
</script>

<template>
  <div class="select-wrapper" @mousedown="checkTargetClick">
    <div class="custom-select">
      <input
        ref="overlay"
        class="overlay"
        @click="setPopper(true)"
        @focusout="setPopper(false)"
      />
      <slot name="render-value" class="default-value body1"></slot>
      <svg
        class="svg-icon"
        :style="{ transform: `rotate(${false ? 0 : 180}deg)` }"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M62.4 744 520 288 968 744Z" />
      </svg>
    </div>
    <div class="popper" v-show="openPopper">
      <slot name="items" :handleChange="handleChange"></slot>
    </div>
  </div>
</template>
