require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb', extended: true}));
app.use(require("./controllers/PatientsTreatments"));

app.get("/", (req, res) => {
  res.send(
    "Hello, I'm an ETL server that gets data from hospitals! Would be nice to have Swagger here!"
  );
});

app.listen(port, async () => {
  console.log(`ETL server, listening on port ${port}`);
});
