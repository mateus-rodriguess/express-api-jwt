var app = require('./config/server');


const PORT = 8080
app.listen(PORT, function(){
    console.log("http://localhost:" + PORT);
});

