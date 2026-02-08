# Email Subscription Service (mini-module)

This module contains a tiny vertical slice demonstrating:

- Domain schema using `zod` with erasable constants for `Status`.
- A `subscribeUser(email)` use case returning a `Result<T, E>` instead of throwing.
- An in-memory simulated database and an example runner.

Files:

- `schema.ts` — `SubscriberSchema`, `Subscriber` type.
- `usecase.ts` — `subscribeUser(email)` returning `Result<Subscriber, Error>`.
- `result.ts` — small `Result` type with `ok`/`err` helpers.
- `example.ts` — quick runner showing expected behaviors.

Usage:

Run the example with `ts-node` (project must have `zod` and a TS runtime available):

```
npx ts-node modules/email-subscription-service/example.ts
```
