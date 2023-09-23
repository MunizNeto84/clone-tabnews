function status(req, resp) {
  resp.status(200).json({
    chave: "Estou enviando uma resposta via http",
  });
}

export default status;
