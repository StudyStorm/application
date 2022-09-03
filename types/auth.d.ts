// use to type AuthModule
import { Auth } from "#auth/runtime";
import User from "~/models/User";

export interface AppAuth extends Auth {
  get user(): User | null;
}

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $auth: AppAuth;
  }
}
declare module "#app" {
  interface NuxtApp {
    $auth: AppAuth;
  }
}
