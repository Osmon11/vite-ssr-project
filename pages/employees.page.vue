<template>
  <PageContainer>
    <div class="flex-box-center">
      <main>
        <p
          class="title divider py-5 mt-5 text-center"
          style="width: 100%"
        >
          {{
            $t(
              "lang-55f459ef-9533-4515-971c-ccd8e9d578be"
            )
          }}
        </p>
        <DataContainer
          :loading="loading"
          :noData="Boolean(!employees.length)"
          noDataText="lang-0f169495-a22f-4075-b193-8a23d081d82b"
        >
          <div v-if="employees.length">
            <v-expansion-panels
              class="my-4"
              variant="popout"
              v-if="xs || sm"
            >
              <v-expansion-panel
                elevation="0"
                v-for="employee in employees"
                :key="employee._id"
              >
                <v-expansion-panel-title>
                  <div
                    class="d-flex align-center justify-start gap"
                  >
                    <v-avatar size="x-large">
                      <v-img
                        :src="`${apiUrl}${employee.avatar}`"
                        :alt="
                  employee[`fullname_${locale}` as keyof typeof employee]
                "
                      ></v-img
                    ></v-avatar>
                    <p
                      class="title"
                      style="font-size: 24px"
                    >
                      {{
                        employee[
                          `fullname_${locale}` as keyof typeof employee
                        ]
                      }}
                    </p>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="pa-4"
                >
                  {{
                    employee[
                      `biography_${locale}` as keyof typeof employee
                    ]
                  }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-banner
              class="my-4"
              lines="three"
              v-else
              v-for="employee in employees"
              :key="employee._id"
            >
              <template #prepend
                ><v-avatar size="x-large">
                  <v-img
                    :src="`${apiUrl}${employee.avatar}`"
                    :alt="
                  employee[`fullname_${locale}` as keyof typeof employee]
                "
                  ></v-img></v-avatar
              ></template>
              <v-banner-text
                ><p
                  class="title"
                  style="font-size: 24px"
                >
                  {{
                    employee[
                      `fullname_${locale}` as keyof typeof employee
                    ]
                  }}
                </p>
                {{
                  employee[
                    `biography_${locale}` as keyof typeof employee
                  ]
                }}</v-banner-text
              ></v-banner
            >
          </div>
        </DataContainer>
      </main>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { computed, onMounted, ref } from "vue";

  import DataContainer from "@/containers/DataContainer.vue";
  import PageContainer from "@/containers/PageContainer.vue";

  import { apiUrl } from "@/utils/constants";
  import { useEmployeeStore } from "@/stores/employee";

  const { locale } = useI18n();

  const employeeStore = useEmployeeStore();
  const loading = ref(null);
  const xs = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 600
  );
  const sm = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 960
  );

  const employees = computed(
    () => employeeStore.getEmployees
  );

  onMounted(() => {
    loading.value = true;
    employeeStore
      .fetchEmployeeList()
      .then(() => (loading.value = false));
  });
</script>
