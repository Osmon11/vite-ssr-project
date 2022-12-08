<template>
  <div
    class="modal-container py-10"
    v-show="open"
    @click.stop="closeModalHandler"
    data-container="true"
    :style="bodyScroll"
  >
    <main
      class="paper"
      :style="paperScroll"
    >
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watch } from "vue";

  const props = defineProps({
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    onClose: { type: Function, required: true },
    scroll: { type: String, default: "paper" },
  });
  const bodyScroll = computed(() => ({
    overflow:
      props.scroll === "body" ? "auto" : "hidden",
  }));
  const paperScroll = computed(() => ({
    overflow:
      props.scroll === "paper"
        ? "auto"
        : "hidden",
  }));

  watch(
    () => props.open,
    (value) => {
      let HTML =
        document.getElementsByTagName("html")[0];
      if (value) {
        HTML.classList.add("hide-scrollbar");
      } else {
        HTML.classList.remove("hide-scrollbar");
      }
    }
  );

  function closeModalHandler(event: Event) {
    if (
      (event.target as HTMLElement).hasAttribute(
        "data-container"
      )
    ) {
      props.onClose(false);
    }
  }
</script>
