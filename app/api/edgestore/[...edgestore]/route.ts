import { currentUser } from "@/lib/auth";
import { initEdgeStore } from "@edgestore/server";
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { redirect } from "next/navigation";
import { z } from "zod";

type Context = {
  userId: string;
  userRole: "admin" | "user";
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
  const session = await currentUser();
  if (!session || !session.id) {
    redirect("/auth/sign-in");
  }

  return {
    userId: session?.id,
    userRole: session?.level >= 5000 ? "admin" : "user",
  };
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  myPublicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, // 1MB
    })
    .input(
      z.object({
        type: z.enum(["profile", "post", "health-record"]),
      })
    )
    .path(({ input }) => [{ type: input.type }]),

  myProtectedFiles: es
    .fileBucket()
    .path(({ ctx }) => [{ owner: ctx.userId }])
    .accessControl({
      OR: [
        {
          userId: { path: "owner" },
        },
        {
          userRole: { eq: "admin" },
        },
      ],
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
