<script setup>
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
</script>

<template>
  <Header />
  <div class="flex-box-center">
    <main style="min-height: 100vh">
      <v-banner class="my-4" :lines="5">
        <template #prepend
          ><v-avatar size="x-large">
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img></v-avatar
        ></template>
        <v-banner-text
          ><p class="title" style="font-size: 24px">John Doe</p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam quia
          similique in eos corporis officia labore commodi iusto voluptas, hic
          veritatis voluptate laboriosam sequi, nemo quaerat illo quas deserunt
          debitis pariatur obcaecati soluta repellat provident quidem deleniti.
          Tenetur quae ipsam voluptate dolore aliquam ipsum obcaecati maiores
          inventore, error numquam eos.</v-banner-text
        ></v-banner
      >
    </main>
  </div>
  <Footer />
</template>
