// Import necessary modules and dependencies
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Initialize PrismaClient
const prisma = new PrismaClient();

// Define authentication options
const authOptions = {
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma), // Use Prisma Adapter
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // Find user in the database
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        // Check if user exists and password is correct
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user; // Return user if credentials are valid
        }
        return null; // Return null if user data could not be retrieved or credentials are invalid
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.image = user.image;
        session.admin=user.admin;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        const { email, name, picture } = profile;

        // Check if the user already exists
        let existingUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!existingUser) {
          // Create a new user if not exists
          existingUser = await prisma.user.create({
            data: {
              name: name,
              email: email,
              image: picture, // Use 'picture' to set the image URL
            },
          });
        } else if (existingUser.image !== picture) {
          // Update existing user's image if it's different
          existingUser = await prisma.user.update({
            where: { email: email },
            data: { image: picture },
          });
        }

        // Associate the Google account with the user
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          },
          create: {
            userId: existingUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          },
        });
      }
      return true;
    },
  },
};

export { authOptions };
// Initialize NextAuth with authentication options
const nextAuthHandler = NextAuth(authOptions);

// Export the NextAuth handler for both GET and POST requests
export { nextAuthHandler as GET, nextAuthHandler as POST };
