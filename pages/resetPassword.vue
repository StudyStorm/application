<script setup lang="ts">
    const img = '/images/post-it-for-login.png'
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
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full p-6 bg-white rounded-lg md:mt-0 sm:max-w-md sm:p-8">
            <div class="mb-1 text-xl text-center text-black md:text-2xl">
              Reset your password
            </div>
            <form class="mt-24 space-y-4 lg:mt-24 md:space-y-5" action="#">
    
              <div>
                <label for="password" class="block mb-2 text-sm text-gray-900">New password</label>
                <div class="relative">
                  <input type="password" name="password" id="password" placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
    
                    <!-- :class="{ 'hidden': !show, 'block': show }" -->
                    <button>Show</button>
                    <!-- <button>Hide</button> -->
                  </div>
                </div>
              </div>
    
              <div>
                <label for="confirmPw" class="block mb-2 text-sm text-gray-900">Confirm new password</label>
                <div class="relative">
                  <input type="password" name="confirmPw" id="confirmPw" placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
    
                    <!-- :class="{ 'hidden': !show, 'block': show }" -->
                    <button>Show</button>
                    <!-- <button>Hide</button> -->
                  </div>
                </div>
              </div>
    
              <button type="submit"
                class="w-full text-white bg-storm-blue hover:bg-storm-darkblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset</button>
            </form>
          </div>
        </div>
      </section>
    </template>
    