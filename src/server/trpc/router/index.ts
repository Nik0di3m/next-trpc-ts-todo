// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { testRouter } from "./task";

export const appRouter = t.router({
    example: exampleRouter,
    auth: authRouter,
    task: testRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
