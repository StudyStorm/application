import { useRuntimeConfig } from "#app";

/**
 * Hook to get Git revision from the Nuxt instance.
 */
export default function useGitRev(): string {
  const config = useRuntimeConfig();
  return config.gitRef;
}
