import { app } from "./server/server"
import "dotenv/config";

const PORT = process.env.PORT ?? 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando porta: ${PORT}`);
});
