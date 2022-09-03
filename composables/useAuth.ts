import { Auth } from "#auth/runtime";
import { useNuxtApp } from "#app";

/**
 * Hook to get the auth instance.
 */
export default function useAuth(): Auth {
  return useNuxtApp().$auth;
}

// use to type AuthModule
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    /**
     * Access to the application's Auth
     */
    $auth: Auth;
  }
}
