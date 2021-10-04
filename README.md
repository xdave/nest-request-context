# NestJS Request Context based on node's AsyncLocalStorage

## Makes the instance data fields of any injectable singleton class request-scoped.

- Due to the design of some packages (ie. `@nestjs/cqrs`) forcing everything
  into the default, singleton scope, it becomes impossible to use request-scoped
  providers inside of them, as singleton-scoped providers cannot depend on
  request-scoped providers.
- As a solution, this uses node's AsyncLocalStorage from `async_hooks` to wrap
  the class in a `Proxy` that allows you to set/get fields on the class that are
  scoped any way that you want. Generally speaking, you'll want it scoped to the
  current Request.

# Getting Started

Install:

```
$ npm i nest-request-context
```

Define some class that you would like to have properties that are
request-scoped:

```ts
@Injectable()
export class RequestContext {
  foo!: string;
  bar!: string;
}
```

Then, define a place for the AsyncLocalStorage to live, perhaps in another file:

```ts
export const requestContext = new AsyncLocalStorage<RequestContext>();
```

Import then into some module and provide a list of classes and their
corresponding AsyncLocalStorage:

```ts
import { Module } from '@nestjs/common';
import { NestRequestContextModule } from 'nest-request-context';
import { RequestContext } from './request-context.model';
import { requestContext } from './request-context.storage';

@Module({
  imports: [
    NestRequestContextModule.forRoot({
      contexts: [
        { contextClass: RequestContext, asyncContext: requestContext },
      ],
    }),
  ],
})
export class AppModule {}
```

IMPORTANT: In order for this to work, you need to initialize the AsyncLocalStorage somewhere, perhaps in middleware or (preferrably) a global Guard, for examle:

```ts
@Injectable()
export class RequestContextGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    requestContext.enterWith({ foo: 'foo', bar: 'bar' });
    return true;
  }
}
```

And then in AppModule:

```ts
@Module({
  // ...
  providers: [
    {
      provide: APP_GUARD,
      useClass: RequestContextGuard,
    },
  ],
})
export class AppModule {}
```

It's important to note that this only works well in most circumstances if the function in which you call `enterWith()` is NOT an async function returning a Promise.

If you use a Guard (instead of middlware), then a couple of things become
possible:

1. Other guards (such as those used by PassportJS) can receive the benefit
   of the request context.
2. Other ExecutionContext types (other than `http`) can also benefit from
   using the request context, such as `ws` (websockets) and `rpc` (ie.
   `@nestjs/microservices`)

After all of this is setup as described above, then you can use it like the
following in a singleton, for example:

```ts
@CommandHandler(DoSomething)
export class DoSomethingHandler implements ICommandHandler<DoSomething> {
  constructor(private readonly ctx: RequestContext) {}

  async execute(command: DoSomething): Promise<void> {
    const foo = this.ctx.foo;
    this.ctx.bar = 'bar!';
    // ...
  }
}
```

The getting/setting of values on the `RequestContext` instance will be scoped
to the current request and not interfere with other simultaneous requests.

See the apps/example directory for a complete example.
