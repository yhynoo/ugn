import express from "npm:express@4.18.2"
import ejs from "npm:ejs"

import { drawProcessedQuery, processQuery } from './js/scripts.js'

const app = express()

// setting the app to work with EJS and telling it where to take the views from
app.set('view engine', 'ejs')
app.set('views', './views')

// setting the app to load CSS properly -- Deno.cwd() returns the root directory.
app.use(express.static(Deno.cwd() + '/static'))

// allow using URL-encoded requests
app.use(express.urlencoded({ extended: true }))


// request management

app.get("/", (req, res) => {
  res.render("index")
});

app.post('/', (req, res) => {
  const query = req.body.query
  const processedData = drawProcessedQuery(processQuery(query))

  res.render("index", { data: processedData })
})

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});