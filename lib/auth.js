import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not defined in .env.local");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB || "digital_library");

// Build social providers config conditionally
const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },
  ...(Object.keys(socialProviders).length > 0 && { socialProviders }),
  user: {
    additionalFields: {
      image: { type: "string", required: false, defaultValue: "" },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: [
    "http://localhost:3000",
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_BASE_URL,
  ].filter(Boolean),
});
