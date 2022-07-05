<script setup>
  import { ref } from "@vue/reactivity";
  import { onMounted, onUnmounted } from "@vue/runtime-core";
  import { useRouter } from "vue-router";

  const props = defineProps(["scrollIntoHandler"]);

  const navigate = useRouter();
  const navigation = [
    { label: "Introduction", key: "introduction" },
    { label: "About Us", key: "about_us" },
    { label: "Why Us", key: "why_us" },
    {
      label: "Our Experiences",
      key: "our_experiences",
    },
    { label: "Our Services", key: "our_services" },
    { label: "Blog", key: "blog" },
    { label: "Login", to: "/login" },
  ];
  const isActive = ref(true);
  function handleScroll() {
    isActive.value = window.scrollY === 0;
  }
  function navHandler(item) {
    if (item.key) {
      props.scrollIntoHandler(item.key);
    } else {
      navigate.push(item.to);
    }
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
          @click="scrollIntoHandler('top')"
          style="height: 100px; gap: 10px; padding: 0px 10px; cursor: pointer"
        >
          <img class="logo" src="../assets/AA_LOGO.svg" alt="logo" />
          <p
            class="logo_text"
            :style="{ color: isActive ? '#FFFFFF' : '#61a375' }"
          >
            Amanat Advisory LLC
          </p>
        </div>
        <nav class="flex_box">
          <div
            class="nav_item"
            :class="{ nav_item_secondary: !isActive }"
            v-for="item in navigation"
            :key="item.label"
            @click.stop="navHandler(item)"
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
    background-color: #ffffff;
    border-bottom: 1px solid #88b06a;
  }
  header.active {
    background-color: transparent;
    padding: 20px 0px;
  }
</style>
