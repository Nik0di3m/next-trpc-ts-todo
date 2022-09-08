import { t } from "../trpc";
import { z } from "zod";

export const testRouter = t.router({
    getTask: t.procedure.query(({ ctx }) => {
        return ctx.prisma.task.findMany();
    }),

    taskStatusUpdate: t.procedure
        .input(z.object({ id: z.string(), isDone: z.boolean() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.task.update({
                where: {
                    id: input.id,
                },
                data: {
                    isDone: input.isDone,
                },
            });
        }),
    taskContentUpdate: t.procedure
        .input(z.object({ id: z.string(), taskContent: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.task.update({
                where: {
                    id: input.id,
                },
                data: {
                    taskContent: input.taskContent,
                },
            });
        }),
    addNewTask: t.procedure
        .input(
            z.object({
                taskContent: z.string().min(3, { message: "Too short" }),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.task.create({
                data: {
                    taskContent: input.taskContent,
                },
            });
        }),
    taskDelete: t.procedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.task.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
