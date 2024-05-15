import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Find the user by name
        const user = await prisma.user.findFirst({
          where: {
            name: credentials?.name,
          },
        });

        if (!user) {
          return null;
        }

        // Compare the provided password with the hashed password in the database
        const password: string = credentials?.password || "";
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
          // Return the user object if the password is valid
          return {
            ...user,
            id: user.id.toString(),
          };
        } else {
          // Return null if the password is not valid
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
