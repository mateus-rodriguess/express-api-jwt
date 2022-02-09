var app = require('./config/server');


const POSRT = 8080
app.listen(POSRT, function(){
    console.log("http://localhost:" + POSRT);
});

