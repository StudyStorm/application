<script setup lang="ts">
import { ClassroomAccessRight } from "~~/models/Classroom";
import User from "~~/models/User";

const { t } = useI18n();

const props = defineProps<{
  member: User;
  canEdit: boolean;
}>();

const editMode = ref(false);
const newAccessRight = ref<ClassroomAccessRight>(props.member.access_right);

const emit = defineEmits(["changeRole"]);

const changeRole = () => {
  emit("changeRole", props.member.email, newAccessRight.value);
  editMode.value = false;
};

const prettyRole = ref({
  read: t("app.roles.read"),
  read_write: t("app.roles.write"),
  read_write_delete: t("app.roles.delete"),
  owner: t("app.roles.owner"),
  subscriber: t("app.roles.subscriber"),
});
</script>

<template>
  <div class="flex items-center justify-between border-b py-2 text-storm-dark">
    <div class="flex items-center">
      <nuxt-img
        class="h-10 w-10 rounded-full"
        :src="member.picture_url"
      ></nuxt-img>
      <div class="ml-4 font-medium">
        {{ member.first_name }} {{ member.last_name }}
      </div>
    </div>
    <div
      v-if="!canEdit || !editMode"
      class="mr-2 cursor-pointer rounded bg-purple-300 px-2.5 py-0.5 text-sm font-medium text-storm-purple"
      :class="{ 'cursor-default': !canEdit }"
      @click="editMode = true"
    >
      {{ prettyRole[member.access_right] }}
    </div>
    <select
      v-else-if="canEdit"
      v-model="newAccessRight"
      class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-storm-dark focus:border-storm-blue focus:ring-storm-blue"
      @change="changeRole"
    >
      <option selected value="read">{{ $t("app.roles.read") }}</option>
      <option value="read_write">{{ $t("app.roles.write") }}</option>
      <option value="read_write_delete">
        {{ $t("app.roles.delete") }}
      </option>
      <option value="owner">{{ $t("app.roles.owner") }}</option>
      <option value="subscriber">{{ $t("app.roles.subscriber") }}</option>
    </select>
  </div>
</template>
