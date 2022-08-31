<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline/index.js";
definePageMeta({
    layout: "nosidebar",
});

function sendEmail() {
    console.log("L'envoie de l'email est encore à faire");
}
</script>
    
    <template>
    <div class="h-screen mx-auto mt-10 md:mt-0">
        <div class="flex flex-col w-full h-full max-w-xs mx-auto md:justify-center">
            <a href="/login" class="flex justify-start text-storm-dark hover:underline">
                <ArrowLeftIcon class="w-6 h-6 mr-2" />{{  $t('app.reset.returnLogin')  }}
            </a>
            <div class="w-full mt-16 text-4xl font-bold">
                {{  $t("app.forgottenPassword.title")  }}
            </div>
            <div class="w-full mt-16">
                <form @submit.prevent="sendEmail">
                    <label for="email" class="block mb-2 text-sm text-gray-900">{{  $t('app.forgottenPassword.email') 
                        }}</label>
                    <input type="email" name="email" id="email" placeholder="John.doe@gmail.com"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required>
                    <button type="submit"
                        class="w-full text-white mt-4 bg-storm-blue hover:bg-storm-darkblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{
                         $t('app.forgottenPassword.submit')  }}</button>
                </form>
            </div>
            <a href="#" class="w-full mt-16 hover:text-storm-blue hover:underline">{{
                 $t("app.verify.noEmail") 
                }}</a>
        </div>
    </div>
</template>
