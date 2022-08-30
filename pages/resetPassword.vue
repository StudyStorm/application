<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";

const img = '/images/post-it-for-login.png';
const router = useRouter();
const credentials = ref({
    email: '',
    password: ''
})
const err = ref<null | any>(null);
let show = true;
// pas fait
async function reset() {
    const { data: answer, error } = await useFetchAPI('/login', {
        method: 'POST',
        body: (credentials.value),
        initialCache: false
    });
    err.value = !answer.value;
    if (answer.value) {
        router.push('/dashboard');
    }
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
                <form class="mt-6 space-y-4 md:mt-24 lg:mt-24 md:space-y-5" action="#">

                    <div>
                        <label for="password" class="block mb-2 text-sm text-gray-900">{{  $t('app.reset.password') 
                            }}</label>
                        <div class="relative">
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">

                                <!-- :class="{ 'hidden': !show, 'block': show }" -->
                                <button>{{  $t('app.reset.showPw')  }}</button>
                                <!-- <button>{{ $t('app.reset.hidePw') }}</button> -->
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="confirmPw" class="block mb-2 text-sm text-gray-900">{{
                             $t('app.reset.confirmPassword')  }}</label>
                        <div class="relative">
                            <input type="password" name="confirmPw" id="confirmPw" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">

                                <!-- :class="{ 'hidden': !show, 'block': show }" -->
                                <button>{{  $t('app.reset.showPw')  }}</button>
                                <!-- <button>{{ $t('app.reset.hidePw') }}</button> -->
                            </div>
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
    