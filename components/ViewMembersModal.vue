<script lang="ts" setup>
import { useClassroomStore } from "../store/classroom";
import { ClassroomAccessRight } from "../models/Classroom";

const store = useClassroomStore();

const showModal = ref(false);
const addUserEmail = ref("");
const selectedRole = ref<ClassroomAccessRight>(ClassroomAccessRight.R);
const currentPage = ref(store.paginationMembers.current_page);

const closeModal = () => {
  showModal.value = false;
  addUserEmail.value = "";
};

const openModal = () => {
  showModal.value = true;
};

const addMember = async () => {
  await store.addMember(
    store.classroom.id,
    addUserEmail.value,
    selectedRole.value
  );
  await store.fetchClassroomUsers(store.classroom.id);
  closeModal();
};

const changePage = (page: number) => {
  if (page > 0 && page <= store.paginationMembers.last_page) {
    currentPage.value = page;
    store.fetchClassroomUsers(store.classroom.id, 4, currentPage.value);
  }
};

const changeMemberRole = async (memberId: string, accessRight: string) => {
  await store.changeMemberRole(store.classroom.id, memberId, accessRight);
  store.fetchClassroomUsers(store.classroom.id, 4, currentPage.value);
};

defineExpose({
  closeModal,
  openModal,
});
</script>
<template>
  <slot :open="openModal" />
  <Modal v-model="showModal">
    <template #title>
      {{ $t("app.classroom.modal.title") }}
    </template>
    <template #content>
      <div class="mb-6">
        <div
          v-if="store.classroom.permissions.is_owner"
          class="flex items-end space-x-2"
        >
          <div class="flex-1">
            <label
              for="message"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ $t("app.classroom.modal.enterEmail") }}</label
            >
            <input
              id="message"
              v-model="addUserEmail"
              type="email"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <select
            v-model="selectedRole"
            class="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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

        <hr class="my-4" />
        <member-row
          v-for="member in store.members.data"
          :key="member.id"
          :member="member"
          :can-edit="store.classroom.permissions.is_owner"
          @change-role="changeMemberRole"
        />
        <div class="mt-4 flex justify-center">
          <s-paginator
            :current-page="currentPage"
            :last="store.paginationMembers.last_page"
            :max-visible="5"
            @change-page="changePage"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <button
        v-if="addUserEmail !== ''"
        type="submit"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-storm-darkblue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-storm-blue focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        @click="addMember"
      >
        {{ $t("app.classroom.modal.confirm") }}
      </button>

      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="closeModal"
      >
        {{ $t("app.classroom.modal.close") }}
      </button>
    </template>
  </Modal>
</template>
