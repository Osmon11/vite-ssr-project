<script setup>
  import Dialog from "@/shared/Dialog.vue";
</script>

<script>
  import EditorJS from "@editorjs/editorjs";
  import NestedList from "@editorjs/nested-list";
  import Paragraph from "@editorjs/paragraph";
  import Checklist from "@editorjs/checklist";
  import Header from "@editorjs/header";
  import Marker from "@editorjs/marker";
  import Quote from "@editorjs/quote";
  import Table from "@editorjs/table";
  import Image from "@editorjs/image";
  import Embed from "@editorjs/embed";
  import Link from "@editorjs/link";
  import Raw from "@editorjs/raw";

  export default {
    created() {
      this.editor = new EditorJS({
        /**
         * Id of Element that should contain the Editor
         */
        holder: "editorjs",

        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
          paragraph: { class: Paragraph, inlineToolbar: true },
          checklist: Checklist,
          header: Header,
          table: Table,
          quote: Quote,
          image: Image,
          embed: Embed,
          link: Link,
          list: {
            class: NestedList,
            inlineToolbar: true,
          },
          marker: {
            class: Marker,
            shortcut: "CTRL+SHIFT+M",
          },
          raw: Raw,
        },
        autofocus: true,
        placeholder: "Напишите что нибудь...",
      });

      window.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          const data = this.editor.save();
          data.then((d) => console.log(d));
        }
      });
    },
    data() {
      return {
        editor: null,
      };
    },
    props: ["open", "onClose"],
  };
</script>

<template>
  <Dialog :open="open" :onClose="onClose">
    <p class="title text-center mb-4" style="width: 100%">Новый пост</p>
    <div class="editor-wrapper"><div id="editorjs"></div></div>
    <div class="flex-box-center">
      <v-btn type="button" color="#61a375" class="text-white"
        >Добавить пост</v-btn
      >
    </div></Dialog
  >
</template>

<style scoped>
  .editor-wrapper {
    max-width: 950px;
    min-height: 450px;
    background: #fff;
    border-radius: 8px;
    -webkit-box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%),
      0 9px 45px 0 rgb(114 119 160 / 12%);
    box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%),
      0 9px 45px 0 rgb(114 119 160 / 12%);
    padding: 70px 50px;
    margin: 32px auto;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
