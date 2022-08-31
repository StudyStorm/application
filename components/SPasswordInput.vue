<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
    modelValue: String
});

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}

const isShown = ref(false);
const fieldType = computed(() => {
    return isShown.value ? 'text' : 'password';
});
</script>
<template>
    <input :type="fieldType" :name="name" :id="id" :placeholder="placeholder" :value="modelValue" @input="updateValue"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        required>
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
        <a href="#" class="hover:underline" @click="isShown = !isShown">{{  isShown ? $t('app.reset.hidePw') : $t('app.reset.showPw')  }}</a>
    </div>
</template>
