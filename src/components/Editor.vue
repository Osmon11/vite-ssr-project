<script>
  import EditorJS from "@editorjs/editorjs";

  import Paragraph from "@editorjs/paragraph";
  import Checklist from "@editorjs/checklist";
  import Header from "@editorjs/header";
  import Quote from "@editorjs/quote";
  import Table from "@editorjs/table";
  import Image from "@editorjs/image";
  import Embed from "@editorjs/embed";
  import List from "@editorjs/list";
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
          paragraph: Paragraph,
          checklist: Checklist,
          header: Header,
          table: Table,
          quote: Quote,
          image: Image,
          embed: Embed,
          link: Link,
          list: List,
          raw: Raw,
        },
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
  };
</script>

<template>
  <div id="editorjs"></div>
</template>
