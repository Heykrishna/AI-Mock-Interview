import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://AI%20Mock%20Interview_owner:npg_bi3a4UomsMzV@ep-black-sun-a47w60vu-pooler.us-east-1.aws.neon.tech/AI%20Mock%20Interview?sslmode=require",
  }
});