import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../models/User";
import dbConnect from "../../../utils/db";
import bcrypt from "bcrypt";


const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: {  label: "Password", type: "password" }
			},
			async authorize(credentials) {
				await dbConnect();
				const user = await User.findOne({ email: credentials?.email });
				if (user && bcrypt.compareSync(credentials?.password as string, user.password)) {
					return user;
				}
		}
	}),
	],
	session: {
		strategy: "jwt",
	},
   callbacks: {
			async jwt({token, user }) {
				if (user) token.id = user.id;
				if (user) token.isAdmin = user.isAdmin;
				return token;
			},
			async session({session, token}) {
        if (token?.id) session.id = token.id;
        if (token?.isAdmin) session.isAdmin = token.isAdmin;
				return session;
			}
		}
};

export default NextAuth(authOptions);
