// Imports
let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let userRoutes = require('./routes/userRoutes');

// Setting public folder to run our main webpage
app.use(express.static("public"));

app.use('/users', userRoutes);

app.listen(port, function () {
    console.log("Server runnning in port: " + port);
});
