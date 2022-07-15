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
      <span class="default-value body1" v-html="defaultLayout"></span>
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
      <div
        class="select-item"
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: item.value === value }"
        @click="handleChange(item.value)"
        v-html="item.layout"
      ></div>
    </div>
  </div>
</template>
