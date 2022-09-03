import { Auth, CookieScheme } from "#auth/runtime";
import {
  CookieSchemeCookie,
  CookieSchemeOptions,
} from "#auth/runtime/schemes/cookie";
import { CookieUserOptions } from "@nuxtjs-alt/auth";

export interface StudyStormOptions {
  name: string;
  user: CookieUserOptions;
  cookie: CookieSchemeCookie;
  baseURL: string;
}

export default class StudyStormScheme<
  OptionsT extends StudyStormOptions
> extends CookieScheme<CookieSchemeOptions> {
  constructor($auth: Auth, options: OptionsT) {
    super(
      $auth,
      {
        name: "StudyStorm",
        endpoints: {
          login: {
            url: `/v1/login`,
            method: "POST",
            baseURL: options.baseURL,
          },
          logout: {
            url: `/v1/logout`,
            method: "POST",
            baseURL: options.baseURL,
          },
          user: {
            url: `/v1/profile`,
            method: "GET",
            baseURL: options.baseURL,
          },
        },
      },
      options
    );
  }
}
