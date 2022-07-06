<script setup>
  import Header from "@/components/Header.vue";
  import BlogListItem from "@/components/BlogListItem.vue";
  import Footer from "@/components/Footer.vue";

  const testArticle = {
    cover: "/src/assets/горы-1.jpg",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, error?",
    shortText:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum ratione distinctio culpa aliquam velit suscipit voluptatum eaque ipsum! Assumenda ipsa natus nobis. Culpa, dicta, facere sint mollitia nulla quibusdam accusantium hic maxime omnis similique distinctio dolorum inventore id eius provident cumque repellat? Blanditiis eligendi asperiores id enim possimus iure ut quibusdam corrupti recusandae? Amet facilis, blanditiis adipisci nisi animi iusto expedita, ad repellendus cum maiores exercitationem modi eaque laborum. Laboriosam deserunt, illo at nulla, incidunt dignissimos molestiae velit facilis iste amet laborum?",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eos eaque explicabo nam blanditiis, in eligendi consequuntur aliquid voluptatem ullam maxime architecto. Commodi eligendi vel veritatis? Voluptatibus temporibus enim perspiciatis excepturi vel repudiandae veniam est minima, consequuntur iure inventore ex, nihil unde delectus cum tempore esse natus dolorem incidunt dolore. Aliquam ex in sed rerum excepturi quo veniam, doloribus aperiam ad mollitia! Illo, fugit nesciunt magni nulla, nam architecto unde vel exercitationem iure iusto dolorem nihil fugiat soluta quis earum eum expedita odit asperiores tempora. Deleniti maxime exercitationem nemo eveniet laborum, sed atque! Distinctio aspernatur a impedit, voluptate odit perspiciatis. Architecto, reiciendis non quidem saepe repellat sunt dolorem veniam quas delectus magnam, voluptates recusandae alias iusto reprehenderit, doloremque quaerat earum? Possimus consequatur delectus nihil deleniti iusto laboriosam quibusdam dolor mollitia ipsum doloribus enim, facere quis, et tenetur corrupti beatae nulla veniam quidem. Molestias magni iure debitis, sint tenetur, nemo magnam illum culpa repellendus enim id tempore esse atque sequi dolorem officiis suscipit harum ipsa. Quasi dignissimos soluta enim obcaecati nemo repellendus ad eius, provident magnam consequuntur labore cumque, veritatis eaque cum rem aliquid maiores culpa, molestias beatae deleniti. Reiciendis pariatur praesentium suscipit earum mollitia. At enim architecto, numquam tempora ducimus incidunt? Aperiam quos perferendis eveniet consequuntur dicta, delectus nisi maxime nemo recusandae temporibus. Magnam sapiente laborum qui provident temporibus rerum voluptate nisi minima optio ab eveniet nihil dolorem, accusantium natus tempora eaque id ad. Aliquam tenetur similique eius perspiciatis iste dolorem temporibus eaque velit necessitatibus aspernatur quisquam, corporis sapiente delectus in ut veniam, consequuntur quaerat placeat ducimus beatae quidem reiciendis ad? Quisquam dolorum ullam, temporibus qui saepe quidem dolorem iusto magni ipsam at nemo illum vel non nesciunt excepturi rerum est commodi asperiores accusantium officia fugiat molestiae sed eligendi. Labore nesciunt dolor repellendus consequatur facere pariatur ex nihil autem! Optio!",
  };
</script>

<template>
  <Header />
  <div
    class="flex_box_center"
    style="min-height: calc(100vh - 545px); margin: 40px 0px"
  >
    <main><BlogListItem :article="testArticle" /></main>
  </div>
  <Footer />
</template>

<style scoped></style>
