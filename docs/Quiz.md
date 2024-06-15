# Quiz

## What are the available properties for the `@Module` decorator?

> Imports, exports, controllers and providers
>
> ✅ Imports allows us to import modules, exports to export modules or providers, controllers to include a controller in the module and providers to include providers/services in the module.

## What is the first argument of the `@Controller` decorator?

> ✅ It's a string, describing the path/route that the controllers handles.

## What are DTO used for?

> ✅ DTOs define the shape of data of an incoming request, and allows us to re-use the definition throughout the application.

## What is the `@Injectable` decorator used for?

> ✅ It is used to define that a certain class should have a shared instance across the module. The instance can then be injected using dependency injection, and all injectors will have access to the some instance and its state.

## How would you retrieve the entire body parameters of a request?

> ✅ By prefixing the handler parameter with the `@Body` decorator, without providing an argument.

## How would you define a handler that can retrieve the "id" parameter from a URL?

> ✅ I'll add `/:id` to the handler's endpoint string definition. Then I can retrieve ir using `@Param("id")`.
