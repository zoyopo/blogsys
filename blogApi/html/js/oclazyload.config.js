/*
*  modules config for ocLazyLoad 
*/
"use strict"
rt
.constant("Modules_Config", [
    {
      name: "ngService",
      module: true,
      files: [
         'js/services.js'
      ]
    },
    {
      name: "ngDirective",
      module: true,
      files: [
         'js/directives.js'
      ]
    }
])
.config(["$ocLazyLoadProvider", "Modules_Config", routeFn]);
function routeFn($ocLazyLoadProvider, Modules_Config) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: false,
    modules: Modules_Config
  });
}