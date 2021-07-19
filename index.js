const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const DBURI = process.env.DBURI;

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get('/', (req, res) => {
    console.log(`running at port ${ PORT }`)
})

mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => app.listen(PORT, () => console.log(`Server started at Port ${PORT}`)))
    .catch(err => console.log(err))