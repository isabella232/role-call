// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'dev',
  production: false,
  oauthClientID:
    '295609371427-c10eqkgp6l7rhm7njnji72cqcm74uo4s.apps.googleusercontent.com',
  mockBackend: false,
  logRequests: true,
  devEmail: 'admin@rolecall.com',
  useDevEmail: true,
  backendURL: 'http://localhost:9091/',
  picPath: 'api/profile_picture/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`,
 * `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a
 * negative impact on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
