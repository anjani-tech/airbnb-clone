import connectDB from "@/config/database"
import User from "@/models/User"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        //Invoked on successfull signin
        async signIn({ profile }) {
            try {
                // 1. Connect to the database
                await connectDB();

                // 2. Check if the user already exists
                const userExists = await User.findOne({ email: profile.email });

                // 3. If the user doesn't exist, create a new user
                if (!userExists) {
                    const username = profile.name.slice(0, 20); // Truncate username if necessary

                    // Create the user in the database
                    await User.create({
                        email: profile.email,
                        username,
                        image: profile.picture
                    });
                }

                return true;  // Proceed with sign-in
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;  // Prevent sign-in if there's an error
            }
        },
        //Session callback function that modifies the session object
        async session({ session }) {
            if (session.user) {
                // 1. Get user from DB
                const user = await User.findOne({ email: session.user.email });

                // Check if user exists in DB
                if (user) {
                    // 2. Assign the user Id from session
                    session.user.id = user._id.toString();
                }
            }

            // 3. Return the session
            return session;
        }

    }
}

export default NextAuth(authOptions)