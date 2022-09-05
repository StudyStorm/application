import { useNuxtApp } from "#app";
import { AppAuth } from "~/types/auth";

/**
 * Hook to get the auth instance.
 */
export default function useAuth(): AppAuth {
  return useNuxtApp().$auth;
}
