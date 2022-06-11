import express from "express";
import bodyParser from "body-parser"
import router from "./router.js"
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


router(app)

app.listen(3001, (err) => {
  if (err) { console.log(err) }
  else {console.log('Server started at port 3001')}
})