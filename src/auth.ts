import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import { getUserByEmail, getUserByIdAuth } from "@/lib/userDb";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/LoginSchema";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,

  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validated = LoginSchema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.id) return false;

      const userExist = await getUserByIdAuth(user.id);
      if (!userExist || !userExist.registerApproval) return false;

      if (!userExist.registerApproval.isAccepted) return false;

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserByIdAuth(token.sub);
      if (!user || !user.userPosition) return token;

      token.role = user.userPosition.role;

      return token;
    },
  },
});
