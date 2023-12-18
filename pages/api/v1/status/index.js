import database from "infra/database.js";

async function status(req, resp) {
  const result = await database.query("SELECT 1+1 as sum;");
  console.log(result.rows);
  resp.status(200).json({
    chave: "Estou enviando uma resposta via http",
  });
}

export default status;
