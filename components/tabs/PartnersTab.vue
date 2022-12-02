<template>
  <div
    class="flex-box-between"
    style="margin-bottom: 16px"
  >
    <p class="title">
      {{
        t(
          "lang-1d767a32-84fc-4c69-9690-8c0578515b97"
        )
      }}
    </p>
    <v-btn
      color="#61a375"
      class="text-white"
      @click="setModal(true)"
      >{{
        t(
          "lang-e6e7353b-1dfd-42fd-9ee8-ee112edee550"
        )
      }}</v-btn
    >
  </div>
  <!-- <div v-if="store.partners.length">
    <v-banner
      class="my-4"
      lines="5"
      v-for="person in store.partners"
      :key="person._id"
    >
      <template #prepend
        ><v-avatar
          size="x-large"
          rounded="0"
        >
          <v-img
            :src="`${apiUrl}${person.logo}`"
            :alt="person[`name_${locale}`]"
          ></v-img></v-avatar
      ></template>
      <v-banner-text
        ><div
          class="flex-box-between"
          style="width: 100%"
        >
          <p
            class="title"
            style="font-size: 24px"
          >
            {{ person[`name_${locale}`] }}
          </p>
          <div
            class="flex-box"
            style="gap: 20px"
          >
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="
                setCurrentPartner(person)
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
              @click.stop="deletePartner(person)"
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
  </div>
  <div
    class="flex-box-center"
    v-else
  >
    <p class="body1">
      {{
        t(
          "lang-783e3082-1406-4f31-8d6e-799b8cd1db50"
        )
      }}
    </p>
  </div> -->
  <PartnerModal
    v-model="openModal"
    :editPartner="currentPartner"
  />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import PartnerModal from "./PartnerModal.vue";

  const { t } = useI18n();
  const openModal = ref(false);
  const currentPartner = ref(null);

  onMounted(() => {});

  // function setCurrentPartner(partner) {
  //   currentPartner.value = partner;
  //   setModal(true);
  // }
  function setModal(value: boolean) {
    openModal.value = value;
    if (!value) {
      currentPartner.value = null;
    }
  }
  // function deletePartner(partner) {
  //   store.setPromp({
  //     message: t(
  //       "lang-55cb3f2e-34db-488a-a78c-386e34be0bde"
  //     ),
  //     confirm() {
  //       store.deletePartner({ id: partner._id });
  //     },
  //   });
  // }
  // function onLoadImg(id) {
  //   loadedImg.value[id] = true;
  // }
</script>
