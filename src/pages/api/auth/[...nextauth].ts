import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    // callbacks: {
    //     session({ session, user }) {
    //         if (session.user) {
    //             session.user.id = user.id;
    //         }
    //         return session;
    //     },
    // },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
        // ...add more providers here
        Credentials({
            name: "Credentials",
            credentials: {
                name: {
                    label: "Name",
                    type: "text",
                    placeholder: "Enter your name",
                },
            },
            async authorize(credentials, _req) {
                const user = { id: 1, name: credentials?.name ?? "J Smith" };
                return user;
            },
        }),
    ],
    secret: env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24 * 30, // 30 days
    },
};

export default NextAuth(authOptions);
