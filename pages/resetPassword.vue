<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";
const router = useRouter();
const datas = ref({
    password: '',
    confirmPassword: ''
});
// const err = ref<null | any>(null);

let passwordNotMatching = computed(() => {
    return datas.value.password !== datas.value.confirmPassword;
});

let passwordIsTooShort = computed(() => {
    return datas.value.password.length < 8;
});

async function sendNewPassword() {
    // const { data: answer, error } = await useFetchAPI('/resetPassword', {
    //     method: 'POST',
    //     body: (datas.value),
    //     initialCache: false
    // });
    // err.value = !answer.value;
    //     if (answer.value) {
    //         router.push('/dashboard');
    //     }
}

definePageMeta({
    layout: "nosidebar",
});
</script>
    
    <template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
            <div class="w-full p-6 md:mt-0 sm:max-w-md sm:p-8">
                <a href="/login" class="flex justify-start text-storm-dark hover:underline">
                    <ArrowLeftIcon class="w-6 h-6 mr-2" />{{  $t('app.reset.returnLogin')  }}
                </a>
                <div class="mt-6 mb-1 text-2xl text-center text-black md:mt-24 md:mb-24">
                    {{  $t('app.reset.title')  }}
                </div>
                <!-- <div v-if="passwordNotMatching == true"
                    class="relative px-4 py-3 mt-6 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                    <span class="block sm:inline">Erreur backend</span>
                </div> -->
                <form class="mt-6 space-y-4 md:space-y-5" @submit.prevent="sendNewPassword">
                    <div>
                        <div class="block mb-2 text-sm text-gray-900">
                            {{  $t('app.reset.email')  }}
                        </div>
                        <input type="email" disabled value="marinelepen@gmail.com"
                            class="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm text-gray-900">{{  $t('app.reset.password') 
                            }}</label>
                        <div class="relative">
                            <SPasswordInput name="password" id="password" placeholder="••••••••"
                                v-model="datas.password" />
                        </div>
                    </div>

                    <div>
                        <label for="confirmPw" class="block mb-2 text-sm text-gray-900">{{
                             $t('app.reset.confirmPassword')  }}</label>
                        <div class="relative">
                            <SPasswordInput name="confirmPw" id="confirmPw" placeholder="••••••••"
                                v-model="datas.confirmPassword" />
                        </div>
                    </div>
                    <div v-if="passwordNotMatching"
                        class="relative px-4 py-3 mt-6 text-red-700 bg-red-100 border border-red-400 rounded"
                        role="alert">
                        <span class="block sm:inline">{{  $t("app.reset.pwNotTheSame")  }}</span>
                    </div>
                    <div v-else
                        class="relative px-4 py-3 mt-6 text-green-500 bg-green-200 border border-green-400 rounded"
                        role="alert">
                        <span class="block sm:inline">{{  $t("app.reset.pwAreTheSame")  }}</span>
                    </div>
                    <div v-if="passwordIsTooShort"
                        class="relative px-4 py-3 mt-6 text-red-700 bg-red-100 border border-red-400 rounded"
                        role="alert">
                        <span class="block sm:inline">{{  $t("app.reset.pwTooShort")  }}</span>
                    </div>
                    <div v-else
                        class="relative px-4 py-3 mt-6 text-green-500 bg-green-200 border border-green-400 rounded"
                        role="alert">
                        <span class="block sm:inline">{{  $t("app.reset.pwLongEnough")  }}</span>
                    </div>

                    <button v-if="passwordIsTooShort || passwordNotMatching" type="submit" disabled
                        class="w-full text-white bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{
                         $t('app.reset.button')  }}</button>

                    <button v-else type="submit"
                        class="w-full text-white bg-storm-blue hover:bg-storm-darkblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{
                         $t('app.reset.button')  }}</button>
                </form>
            </div>
        </div>
    </section>
</template>
    