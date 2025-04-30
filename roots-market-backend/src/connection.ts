import { createClient } from "@libsql/client";

export const connection = createClient({
  url: "file:roots-market-local.db"
})
