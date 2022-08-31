<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";
const router = useRouter();
const datas = ref({
    password: '',
    confirmPassword: ''
});
const err = ref<null | any>(null);

// async function send(){
//     const { data: answer, error } = await useFetchAPI('/login', {
//         method: 'POST',
//         body: (datas.value),
//         initialCache: false
//     });
//     err.value = !answer.value;
//     if (answer.value) {
//         router.push('/dashboard');
//     }
// }

function test(){
    console.log(datas.value);
}

definePageMeta({
    layout: "nosidebar",
});
</script>
    
    <template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
            <div class="w-full p-6 md:mt-0 sm:max-w-md sm:p-8">
                <a href="/login" class="flex justify-start text-storm-dark hover:underline"><ArrowLeftIcon class="w-6 h-6 mr-2" />{{ $t('app.reset.returnLogin')}}</a>
                <div class="mt-6 mb-1 text-2xl text-center text-black md:mt-24">
                    {{  $t('app.reset.title')  }}
                </div>
                <form class="mt-6 space-y-4 md:mt-24 lg:mt-24 md:space-y-5" @submit.prevent="test">

                    <div>
                        <label for="password" class="block mb-2 text-sm text-gray-900">{{  $t('app.reset.password') 
                            }}</label>
                        <div class="relative">
                            <SPasswordInput name="password" id="password" placeholder="••••••••" v-model="datas.password" />
                        </div>
                    </div>

                    <div>
                        <label for="confirmPw" class="block mb-2 text-sm text-gray-900">{{
                             $t('app.reset.confirmPassword')  }}</label>
                        <div class="relative">
                            <SPasswordInput name="confirmPw" id="confirmPw" placeholder="••••••••" v-model="datas.confirmPassword" />
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full text-white bg-storm-blue hover:bg-storm-darkblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{
                         $t('app.reset.button')  }}</button>
                </form>
            </div>
        </div>
    </section>
</template>
    