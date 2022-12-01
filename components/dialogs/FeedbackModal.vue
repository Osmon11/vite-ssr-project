<template>
  <Dialog
    :open="props.modelValue"
    :onClose="closeHandler"
  >
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="handleRequestSubmit"
    >
      <div
        class="flex-box-center"
        style="margin-bottom: 40px"
      >
        <h2 class="title divider">
          {{
            t(
              "lang-1f1c3873-d471-4827-a6c6-aa1a37c58fdc']"
            )
          }}
        </h2>
      </div>
      <div
        class="flex-box"
        style="gap: 20px"
      >
        <v-text-field
          v-model="userName"
          type="text"
          name="userName"
          variant="outlined"
          :label="
            t(
              'lang-fcb1dfa0-9bc4-4f68-aa27-cfea199b636e'
            )
          "
          color="#61a375"
          :rules="[
            (v) =>
              !!v ||
              t(
                'lang-d6579f01-7d46-491a-855a-788dfbd1aeae'
              ),
          ]"
          style="width: calc(50% - 10px)"
        ></v-text-field>
        <v-text-field
          v-model="email"
          type="email"
          name="email"
          variant="outlined"
          :label="
            t(
              'lang-f6988f0f-2bf4-4fbb-91bd-7d7b5ba90a44'
            )
          "
          color="#61a375"
          :rules="[
            (v) =>
              !!v ||
              t(
                'lang-0fa19fd6-2ad1-46ff-be56-c367ceff6d9e'
              ),
          ]"
          style="width: calc(50% - 10px)"
        ></v-text-field>
      </div>
      <v-textarea
        v-model="message"
        type="text"
        name="message"
        variant="outlined"
        :label="
          t(
            'lang-89b06887-112d-4634-8d31-877399ce045e'
          )
        "
        color="#61a375"
        :rules="[
          (v) =>
            !!v ||
            t(
              'lang-a631c2b6-1a5f-4a11-b089-abca736861d1'
            ),
        ]"
      ></v-textarea>
      <div class="flex-box-center">
        <div
          class="flex-box"
          style="gap: 20px"
        >
          <v-btn
            color="#61a375"
            class="text-white"
            type="submit"
            :loading="isLoading"
            >{{
              t(
                "lang-3d74e643-f6a3-4805-a399-de2a65317236"
              )
            }}</v-btn
          >
          <v-btn
            color="#F44336"
            class="text-white"
            @click="closeHandler"
            >{{
              t(
                "lang-13ae4b92-8336-4cdd-adbb-ead122b87cb3"
              )
            }}</v-btn
          >
        </div>
      </div>
      <!-- <VueRecaptcha /> -->
    </v-form>
  </Dialog>
</template>

<script setup>
  import { ref } from "vue";

  import Dialog from "./Dialog.vue";
  import { useI18n } from "vue-i18n";

  const props = defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);
  const { t } = useI18n();
  const form = ref();
  const valid = ref(false);
  const userName = ref("");
  const email = ref("");
  const message = ref("");
  const isLoading = ref(false);

  function handleRequestSubmit() {
    if (valid.value) {
      isLoading.value = true;
      // store.sendFeedback(
      //   {
      //     message: `
      //   Имя: ${userName.value}\n
      //   Почта: ${email.value}\n
      //   Сообщение: ${message.value}
      // `,
      //   },
      //   (success) => {
      //     isLoading.value = false;
      //     if (success) {
      //       closeHandler();
      //     }
      //   }
      // );
    }
  }
  function closeHandler() {
    form.value.reset();
    emit("update:modelValue", false);
  }
</script>
