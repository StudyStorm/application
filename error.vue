<script>
export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
}

const img = "images/post-it-for-login.png";

definePageMeta({
    layout: "nosidebar",
});
</script>
    
    
    <template>
    <div class="flex justify-between h-screen">
        <div class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="w-full max-w-sm mx-auto lg:w-96">
                <div>
                    <div class="flex items-center justify-center">
                        <nuxt-img src="/images/Logo.svg" class="h-16 mr-3 text-4xl text-storm-dark"
                            alt="StudyStorm Logo" />
                        <span
                            class="self-center whitespace-nowrap font-[ZwoDrei] text-4xl font-semibold">StudyStorm</span>
                    </div>
                    <div v-if="error.statusCode == 404"
                        class="mt-6 text-2xl font-bold tracking-tight text-center text-storm-dark">
                        Erreur 404 - Page non trouvée
                    </div>
                    <div v-else class="mt-6 text-2xl font-bold tracking-tight text-center text-storm-dark">
                        Une erreur est survenue
                    </div>
                </div>
                <div>
                    <div class="mt-4">
                        <div class="flex items-center justify-center mt-6 text-center">
                            <div class="text-sm">
                                <p class="mt-2 text-sm text-center text-gray-600">
                                    <NuxtLink to="/dashboard"
                                        class="w-full text-2xl font-medium text-indigo-600 hover:underline hover:text-indigo-500">
                                        Cliquez-ici pour revenir à l'accueil
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative flex-1 hidden background-image lg:block"
            :style="{ backgroundImage: `url(images/post-it-for-login.png)` }"></div>
    </div>
</template>
      
      <style scoped>
      .background-image {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
      }
      </style>
    