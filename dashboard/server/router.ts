import { router } from "./trpc";
import { customerRouter } from "./routers/customer";
import { reportsRouter } from "./routers/reports";

export const appRouter = router({
  customer: customerRouter,
  reports: reportsRouter,
});

export type AppRouter = typeof appRouter;
