const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
app.listen(port, () => {
  console.log(` server listening on port ${port} `)
})