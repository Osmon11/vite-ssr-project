<script setup>
  import Editor from "@/components/Editor.vue";

  function logout() {}
</script>

<template>
  <div
    class="flex_box_center"
    style="background-color: #ffffff; border-bottom: 1px solid #88b06a"
  >
    <main class="flex_box_between">
      <router-link
        to="/"
        class="flex_box"
        style="
          height: 100px;
          padding: 0px 10px;
          cursor: pointer;
          gap: 10px;
          text-decoration: none;
        "
      >
        <img class="logo" src="../assets/AA_LOGO.svg" alt="logo" />
        <p class="logo_text" :style="{ color: '#61a375' }">
          Amanat Advisory LLC
        </p>
      </router-link>
      <nav class="flex_box">
        <router-link class="nav_item nav_item_secondary" to="/blog"
          >Блог</router-link
        >
        <div class="flex_box" style="cursor: pointer" @click="logout">
          <p class="nav_item nav_item_secondary" style="padding-right: 10px">
            Выйти
          </p>
          <img
            src="src/assets/logout-svgrepo-com.svg"
            alt=""
            style="
              width: 24px;
              height: 24px;
              filter: invert(15%) sepia(89%) saturate(7500%) hue-rotate(3deg)
                brightness(93%) contrast(121%);
            "
          />
        </div>
      </nav>
    </main>
  </div>
  <Editor />
</template>
