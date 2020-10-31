const express = require("express");
const app = express();
const path = require("path");
const history = require("connect-history-api-fallback");
const port = process.env.PORT || 3030;
const staticFileMiddleware = express.static(path.join(__dirname + "/dist"));

app.use(staticFileMiddleware);
app.use(
  history({
    verbose: true,
    disableDotRule: true,
  })
);
app.use(staticFileMiddleware);

app.get("/", function(req, res) {
  res.render(path.join(__dirname + "/dist/index.html"));
});

app.listen(port, function() {});
