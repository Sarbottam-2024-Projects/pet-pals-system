require('dotenv').config();

let express = require('express');
let app = express();
let router = require('./routers/routers');
let port = process.env.PORT || 3000;
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);


app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});
