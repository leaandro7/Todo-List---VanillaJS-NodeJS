require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const taskRoute = require("./routes/taskRoute");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", taskRoute);

// Acessa os arquivos externos ao HTML ( CSS/ SCRIPTS / IMAGENS / ETC. )
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  // Acessa pasta VIEWS e renderiza o arquivo HTML
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.log("Erro ao conectar-se com o banco de dados"));

app.listen(PORT, () => {
  console.log(`Server rodando na porta: ${process.env.PORT}`);
});
