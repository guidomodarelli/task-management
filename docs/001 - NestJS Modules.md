# NestJS Modules

Modules are an effective way to organize components by a closely related set of capabilities (eg. per feature)

Modules are singleton, therefore a module can be imported by multiple other modules.

## Defining a module

A module is defined by annotating a class with the `@Module` decorator.

  `@Module` decorator provider

  - _Provider_: Array of providers to be available within the module via dependency injection.
  - _Controllers_: Array of controllers to be instantiated within the module.
  - _Exports_: Array of providers to export to other modules. The other modules that import this module will also have access to whatever this module exports.
  - _Imports_: List of modules required by this module. Array exported provider by these modules will now be available in our module via dependency injection.

