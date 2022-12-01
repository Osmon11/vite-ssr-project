<template>
  <div
    class="flex-box-between"
    style="margin-bottom: 16px"
  >
    <p class="title">
      {{
        t(
          "lang-17988631-887c-48a8-9636-4eafe2657f2d"
        )
      }}
    </p>
    <v-btn
      color="#61a375"
      class="text-white"
      @click="setModal(true)"
      >{{
        t(
          "lang-2b0b4316-3cd1-4db5-84cd-3e3da8788fdc"
        )
      }}</v-btn
    >
  </div>
  <!-- <div v-if="store.shariahBoard.length">
    <v-banner
      class="my-4"
      lines="5"
      v-for="person in store.shariahBoard"
      :key="person._id"
    >
      <template #prepend
        ><v-avatar size="x-large">
          <v-img
            :src="`${apiUrl}${person.avatar}`"
            :alt="person[`fullname_${locale}`]"
          ></v-img></v-avatar
      ></template>
      <v-banner-text
        ><div
          class="flex-box-between"
          style="width: 100%; margin-bottom: 15px"
        >
          <p
            class="title"
            style="
              font-size: 24px;
              padding-bottom: 0px;
            "
          >
            {{ person[`fullname_${locale}`] }}
          </p>
          <div
            class="flex-box"
            style="gap: 20px"
          >
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="
                setCurrentPerson(person)
              "
              >{{
                t(
                  "lang-37a7870d-ae54-4fe1-8767-fa261b98007e"
                )
              }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click.stop="deletePerson(person)"
              >{{
                t(
                  "lang-3b8a75a6-406e-416b-b06a-ac4a8e9e7690"
                )
              }}</v-btn
            >
          </div>
        </div>
        {{
          person[`biography_${locale}`]
        }}</v-banner-text
      ></v-banner
    >
  </div> -->
  <!-- <div
    class="flex-box-center"
    v-else
  >
    <p class="body1">
      {{
        t(
          "lang-959ff8bf-ed3e-4a46-8d9d-2d234d5b3bca"
        )
      }}
    </p>
  </div> -->
  <EmployeeModal
    v-model="openModal"
    :editPerson="currentPerson"
  />
</template>

<script lang="ts" setup>
  import { apiUrl } from "@/utils/constants";
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import EmployeeModal from "./EmployeeModal.vue";

  const { t, locale } = useI18n();
  const openModal = ref(false);
  const currentPerson = ref(null);

  onMounted(() => {});

  function setModal(value: boolean) {
    openModal.value = value;
    if (!value) {
      currentPerson.value = null;
    }
  }
  // function setCurrentPerson(person) {
  //   currentPerson.value = person;
  //   setModal(true);
  // }
  // function deletePerson(person) {
  //   store.setPromp({
  //     message: t(
  //       "lang-9e461e6a-86a1-4cc4-8265-0768d776da8c"
  //     ),
  //     confirm() {
  //       store.deleteEmployee({ id: person._id });
  //     },
  //   });
  // }
  function onCloseModal(value: boolean) {
    setModal(value);
    if (currentPerson) {
      currentPerson.value = null;
    }
  }
</script>

<style scoped>
  .news-item-img {
    width: 20%;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
