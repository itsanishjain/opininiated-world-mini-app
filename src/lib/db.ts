import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/drizzle/schema";

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:./src/drizzle/dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
