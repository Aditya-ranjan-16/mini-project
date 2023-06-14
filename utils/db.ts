import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "../db/schema";
import { Pool } from "@neondatabase/serverless";

const client = new Pool({ connectionString: process.env.DATABASE_URL });

const db = drizzle(client, { schema });

export default db;
