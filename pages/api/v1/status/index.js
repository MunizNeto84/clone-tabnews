function status(request, response) {
  response.status(200).json({ msg: "testando o status aqui" });
}

export default status;
