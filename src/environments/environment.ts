// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDDqs1hraVJRP3pkY5UAzYVtyCXCqNhYI4",
    authDomain: "ng-arriendos-uribia.firebaseapp.com",
    databaseURL: "https://ng-arriendos-uribia-default-rtdb.firebaseio.com",
    projectId: "ng-arriendos-uribia",
    storageBucket: "ng-arriendos-uribia.appspot.com",
    messagingSenderId: "689295074494",
    appId: "1:689295074494:web:e0d72794a1862072f72aef"
  }
};

export const appRoutes = {
  admin: {
    login: "/auth",
    tablero: "/admin/dashboard",
    
    barrios: "/admin/barrios",
    propietarios: "/admin/propietarios",
  
    propiedades: "/admin/propiedades/listar",
    propiedadCrear: "/admin/propiedades/crear",
    propiedadEditar: "/admin/propiedades/editar/:id",
    propiedadDetalle: "/admin/propiedades/detalle/:id",
  
    categorias: "/admin/propiedades/categorias",
    categoriaCrear: "/admin/propiedades/categorias/crear-categoria",
    categoriaEditar: "/admin/propiedades/categorias/editar-categoria",
  },
  home: {
    propiedades: "/home/propiedades/listar",
    propiedadDetalle: "/home/propiedades/detalle/:id"
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
