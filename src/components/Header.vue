<script setup>
  import { ref } from "@vue/reactivity";
  import { onMounted, onUnmounted } from "@vue/runtime-core";

  defineProps(["scrollIntoHandler"]);

  const navigation = [
    { label: "Home", key: "top" },
    { label: "Introduction", key: "introduction" },
    { label: "About Us", key: "about_us" },
    { label: "Why Us", key: "why_us" },
    {
      label: "Our Experiences",
      key: "our_experiences",
    },
    { label: "Our Services", key: "our_services" },
  ];
  const isActive = ref(true);
  function handleScroll() {
    isActive.value = window.scrollY === 0;
  }
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>

<template>
  <header :class="{ active: isActive }">
    <div class="container flex_box_center">
      <div
        class="row flex_box_between"
        style="width: 100%; max-width: 1140px; gap: 5vw"
      >
        <div
          class="flex_box"
          style="height: 100px; padding: 0px 10px; cursor: pointer"
        >
          <img
            class="logo"
            src="../assets/AA_Logo_&_copyright.png"
            alt="logo"
          />
        </div>
        <nav class="flex_box">
          <div
            class="nav_item"
            v-for="item of navigation"
            :key="item.label"
            @click="scrollIntoHandler(item.key)"
          >
            {{ item.label }}
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
  header {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1000;
    padding: 5px 0px;
    background-color: #000000e6;
  }
  header.active {
    background-color: transparent;
    padding: 20px 0px;
  }
  .logo {
    width: 300px;
  }
  .nav_item {
    font-family: "Raleway", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    padding: 0px 15px;
    text-decoration: none;
    cursor: pointer;
  }
</style>
