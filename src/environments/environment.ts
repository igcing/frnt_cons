// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox:{
    accessToken: 'pk.eyJ1IjoiaWN1ZXZhc2kiLCJhIjoiY2toaDZ1emwwMGVkNjJ6bTh4bjdzMXV0OSJ9.uka3rfUN7zXVdfrY5QMY0A'
  },
   urlComuna: 'https://back-conso.herokuapp.com/search/comuna',
   urlFarmacia:'https://back-conso.herokuapp.com/search/farmacia/7/filter?idComuna=$idComuna&nombreLocal=$nombreLocal'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
