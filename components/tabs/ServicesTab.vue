<template>
  <div
    class="flex-box-between"
    style="margin-bottom: 16px"
  >
    <p class="title">
      {{
        $t(
          "lang-63796838-a08d-4eba-b900-ce805c2df2ac"
        )
      }}
    </p>
    <v-btn
      color="#61a375"
      class="text-white"
      @click="dialog = true"
      >{{
        $t(
          "lang-d9a9824d-4f4a-4f98-a4a7-cca0102fee59"
        )
      }}</v-btn
    >
  </div>
  <DataContainer
    :loading="loading"
    :noData="!Boolean(services.length)"
    noDataText="lang-40f56028-ec4e-4dc9-a177-6bc817fe50e2"
  >
    <v-expansion-panels
      style="margin-bottom: 20px"
      v-if="services.length"
    >
      <v-expansion-panel
        v-for="service in services"
        :key="service._id"
      >
        <v-expansion-panel-title>
          <div
            class="flex-box-between"
            style="
              width: 100%;
              padding-right: 20px;
            "
          >
            <p class="subtitle">
              {{
                service[
                  `name_${locale}` as keyof typeof service
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
                @click.stop="onEditClick(service)"
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
                  onDeleteClick(service)
                "
                >{{
                  $t(
                    "lang-3b8a75a6-406e-416b-b06a-ac4a8e9e7690"
                  )
                }}</v-btn
              >
            </div>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div style="padding: 16px">
            <div
              class="content"
              v-html="service[`content_${locale}` as keyof typeof service]"
            ></div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </DataContainer>
  <ServiceDialog v-model="dialog" />
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { computed, onMounted, ref } from "vue";

  import ServiceDialog from "@/components/dialogs/ServiceDialog.vue";
  import DataContainer from "@/containers/DataContainer.vue";

  import { IService } from "@/api/index.types";
  import { useServiceStore } from "@/stores/service";

  const { locale } = useI18n();

  const serviceStore = useServiceStore();
  const dialog = ref(false);
  const loading = ref(false);

  const services = computed(
    () => serviceStore.getServiceList
  );

  onMounted(() => {
    loading.value = true;
    serviceStore.fetchServiceList().then(() => {
      loading.value = false;
    });
  });

  function onEditClick(service: IService) {
    serviceStore.setForm(service);
  }
  function onDeleteClick(service: IService) {
    if (false) {
      serviceStore.delete(service._id);
    }
    // store.setPromp({
    //     message: $t(
    //       "lang-9e461e6a-86a1-4cc4-8265-0768d776da8c"
    //     ),
    //     confirm() {
    //       store.deleteService({ id: service._id });
    //     },
    //   });
  }
</script>
