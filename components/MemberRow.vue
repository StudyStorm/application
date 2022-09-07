<script setup lang="ts">
import { ClassroomAccessRight } from "~~/models/Classroom";
import User from "~~/models/User";

const props = defineProps<{
  member: User;
}>();

const editMode = ref(false);
const newAccessRight = ref<ClassroomAccessRight>(props.member.access_right);

const emit = defineEmits(["changeRole"]);

const changeRole = () => {
  emit("changeRole", props.member.email, newAccessRight.value);
  editMode.value = false;
};
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
      v-if="!editMode"
      class="mr-2 cursor-pointer rounded bg-purple-300 px-2.5 py-0.5 text-sm font-medium text-storm-purple"
      @click="editMode = true"
    >
      {{ member.access_right }}
    </div>
    <select
      v-else
      v-model="newAccessRight"
      class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-storm-dark focus:border-storm-blue focus:ring-storm-blue"
      @change="changeRole"
    >
      <option selected value="read">Read</option>
      <option value="read_write">Read + Write</option>
      <option value="read_write_delete">Read + Write + Delete</option>
      <option value="owner">Owner</option>
    </select>
  </div>
</template>
