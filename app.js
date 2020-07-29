/* importar as configurações do servidor */
var app = require("./config/server");

/* parametrizar a porta de escuta */
app.listen(process.env.PORT, function () {
  console.log(process.env.PORT);
  console.log(`Servidor online na porta ${process.env.PORT}`);
});
