<template>
  <DataContainer
    :noData="!Boolean(partners.length)"
    noDataText="lang-783e3082-1406-4f31-8d6e-799b8cd1db50"
  >
    <div v-if="partners.length">
      <v-banner
        class="my-4"
        lines="three"
        v-for="partner in partners"
        :key="partner._id"
      >
        <template #prepend
          ><v-avatar
            size="x-large"
            rounded="0"
          >
            <v-img
              :src="`${apiUrl}${partner.logo}`"
              :alt="partner[`name_${locale}` as keyof typeof partner]"
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
              {{
                partner[
                  `name_${locale}` as keyof typeof partner
                ]
              }}
            </p>
            <div
              class="flex-box"
              style="gap: 20px"
            >
              <v-btn
                color="#61a375"
                class="text-white"
                @click.stop="onEditClick(partner)"
                >{{
                  $t(
                    "lang-37a7870d-ae54-4fe1-8767-fa261b98007e"
                  )
                }}</v-btn
              >
              <v-btn
                color="#F44336"
                class="text-white"
                @click.stop="
                  onDeleteClick(partner)
                "
                >{{
                  $t(
                    "lang-3b8a75a6-406e-416b-b06a-ac4a8e9e7690"
                  )
                }}</v-btn
              >
            </div>
          </div>
          {{
            partner[
              `biography_${locale}` as keyof typeof partner
            ]
          }}</v-banner-text
        ></v-banner
      >
    </div>
  </DataContainer>
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { computed } from "vue";

  import DataContainer from "@/containers/DataContainer.vue";

  import { IPartner } from "@/api/index.types";
  import { apiUrl } from "@/utils/constants";

  import { usePartnerStore } from "@/stores/partner";
  import { useNotification } from "@/utils/useNotification";

  const emit = defineEmits(["edit-click"]);

  const { locale } = useI18n();
  const { setPromp } = useNotification();

  const partnerStore = usePartnerStore();

  const partners = computed(
    () => partnerStore.getPartners
  );

  function onEditClick(partner: IPartner) {
    partnerStore.setForm(partner);
    emit("edit-click");
  }
  function onDeleteClick(partner: IPartner) {
    setPromp({
      message:
        "lang-55cb3f2e-34db-488a-a78c-386e34be0bde",
      confirm() {
        partnerStore.delete(partner._id);
      },
    });
  }
</script>
