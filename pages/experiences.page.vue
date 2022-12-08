<template>
  <PageContainer>
    <div
      class="flex-box-center"
      style="
        min-height: calc(100vh - 100px);
        align-items: flex-start;
        margin: 50px 0px;
      "
    >
      <main>
        <div class="column-wrap">
          <div
            class="flex-box-center"
            style="margin-bottom: 40px"
          >
            <h2 class="title divider">
              {{
                $t(
                  "lang-ef952636-74de-4f4c-a2b1-df869f04e844"
                )
              }}
            </h2>
          </div>
          <p
            class="body1"
            style="
              margin-bottom: 20px;
              padding: 16px;
            "
          >
            {{
              $t(
                "lang-29b886c8-b489-489f-b369-1bd6d0403126"
              )
            }}
          </p>
        </div>
      </main>
    </div></PageContainer
  >
</template>

<script lang="ts" setup>
  import PageContainer from "@/containers/PageContainer.vue";
</script>
