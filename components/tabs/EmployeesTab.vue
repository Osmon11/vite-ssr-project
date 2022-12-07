<template>
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
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";

  import { IEmployee } from "@/api/index.types";
  import { apiUrl } from "@/utils/constants";

  import { useEmployeeStore } from "@/stores/employee";
  import { useNotification } from "@/utils/useNotification";

  const emit = defineEmits(["edit-click"]);

  const { locale } = useI18n();
  const { setPromp } = useNotification();

  const employeeStore = useEmployeeStore();

  const employees = computed(
    () => employeeStore.getEmployees
  );

  function onEditClick(employee: IEmployee) {
    employeeStore.setForm(employee);
    emit("edit-click");
  }
  function onDeleteClick(employee: IEmployee) {
    setPromp({
      message:
        "lang-9e461e6a-86a1-4cc4-8265-0768d776da8c",
      confirm() {
        employeeStore.delete(employee._id);
      },
    });
  }
</script>

<style scoped>
  .news-item-img {
    width: 20%;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
