# NestJS logging

**Why do we need logs?**

So in our application, we have different operations. Some are very important, some less important, some are destructive, and some are note. And if something goes wrong, we need a way to understand what happened, where ir happened and when it happened. And logs can really help with that. So we could apply logs at different levels before, during and after certain operations. And this is going to help us get context.

## Types of logs

There are different types of logs and there types can be useful for different situations.

- `LOG`: general purpose logging of important information
- `WARNING`: Unhandled issue that is NOT fatal or destructive
  - For example, when we manage to save a task in the database, but only after 2 attempts.
- `ERROR`: Unhandled issue that is fatal or destructive for our system
  - For example, when we failed to save a task in the database, even though validation has passed.
- `DEBUG`: Useful information that can help us debug the logic in case of an error/warning. Intended for developers.
  - For example, logging the state of the application during some operation.
- `VERBOSE`: Information providing insights about the behavior of the application. Intended for operators (for example, support). Usually "too much information".
  - For example, when creating a task, you could log a DTO and the username of the creator.

### Log levels

You could define multiple log levels for different environments.
For example:
|             | Log | Error | Warning | Debug | Verbose |
| :---------: | :-: | :---: | :-----: | :---: | :-----: |
| Development | ✅  |  ✅   |   ✅    |  ✅   |   ✅    |
|   Staging   | ✅  |  ✅   |   ✅    |  ❌   |   ❌    |
| Production  | ✅  |  ✅   |   ❌    |  ❌   |   ❌    |

