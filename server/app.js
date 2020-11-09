const express = require("express")
const app = express()
const path = require("path")
const history = require("connect-history-api-fallback")
const port = process.env.PORT || 3030
const staticFileMiddleware = express.static(path.join(__dirname + "/dist"))

app.use(staticFileMiddleware)
app.use(
  history({
    verbose: true,
    disableDotRule: true,
    rewrites: [
      { 
        from: /\/assets\//, 
        to(context) {
          return context.parsedUrl.pathname;
        }
      }
    ]
  })
)
app.use(staticFileMiddleware)
app.use("/assets", express.static(path.join(__dirname + "/assets")))

app.get("/", function(req, res) {
  res.render(path.join(__dirname + "/dist/index.html"))
})

app.listen(port, function() {})
