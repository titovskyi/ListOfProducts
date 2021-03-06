// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: {
    login: 'http://localhost:3000/auth/login',
    check: 'http://localhost:3000/auth/check-token',
    signUp: 'http://localhost:3000/user',
    user: 'http://localhost:3000/user',
    lists: 'http://localhost:3000/list',
    updateList: 'http://localhost:3000/list',
    products: 'http://localhost:3000/product',
    category: 'http://localhost:3000/category'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
