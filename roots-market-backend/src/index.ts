import app from "./app.ts";
import { PORT } from "./config.ts";

async function main() {
  try{
    app.listen(PORT)
    console.log(`Listening on port http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`)
  } catch(error){
    console.error(error);
  }
}

main()
