<template>
  <div
    class="flex-box-between"
    style="margin-bottom: 16px"
  >
    <p class="title">
      {{
        $t(
          "lang-17988631-887c-48a8-9636-4eafe2657f2d"
        )
      }}
    </p>
    <v-btn
      color="#61a375"
      class="text-white"
      @click="dialog = true"
      >{{
        $t(
          "lang-2b0b4316-3cd1-4db5-84cd-3e3da8788fdc"
        )
      }}</v-btn
    >
  </div>
  <DataContainer
    :noData="!Boolean(employees.length)"
    noDataText="lang-959ff8bf-ed3e-4a46-8d9d-2d234d5b3bca"
  >
    <div v-if="employees.length">
      <v-banner
        class="my-4"
        lines="three"
        v-for="employee in employees"
        :key="employee._id"
      >
        <template #prepend
          ><v-avatar size="x-large">
            <v-img
              :src="`${apiUrl}${employee.avatar}`"
              :alt="employee[`fullname_${locale}` as keyof typeof employee]"
            ></v-img></v-avatar
        ></template>
        <v-banner-text
          ><div
            class="flex-box-between"
            style="
              width: 100%;
              margin-bottom: 15px;
            "
          >
            <p
              class="title"
              style="
                font-size: 24px;
                padding-bottom: 0px;
              "
            >
              {{
                employee[
                  `fullname_${locale}` as keyof typeof employee
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
                @click.stop="
                  onEditClick(employee)
                "
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
                  onDeleteClick(employee)
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
            employee[
              `biography_${locale}` as keyof typeof employee
            ]
          }}</v-banner-text
        ></v-banner
      >
    </div>
  </DataContainer>
  <EmployeeDialog v-model="dialog" />
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { computed, ref } from "vue";

  import EmployeeDialog from "@/components/dialogs/EmployeeDialog.vue";

  import { useEmployeeStore } from "@/stores/employee";

  import { IEmployee } from "@/api/index.types";
  import { apiUrl } from "@/utils/constants";

  const { locale } = useI18n();

  const employeeStore = useEmployeeStore();
  const dialog = ref(false);

  const employees = computed(
    () => employeeStore.getEmployees
  );

  function onEditClick(employee: IEmployee) {
    employeeStore.setForm(employee);
  }
  function onDeleteClick(employee: IEmployee) {
    if (false) {
      employeeStore.delete(employee._id);
    }
    //   store.setPromp({
    //     message: $t(
    //       "lang-9e461e6a-86a1-4cc4-8265-0768d776da8c"
    //     ),
    //     confirm() {
    //       store.deleteEmployee({ id: person._id });
    //     },
    //   });
  }
</script>

<style scoped>
  .news-item-img {
    width: 20%;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
