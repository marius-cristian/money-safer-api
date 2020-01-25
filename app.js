let express = require('express');
bodyParser = require('body-parser');
const cors = require('cors');
let app = express();
const  router = express.Router();

app.use(bodyParser.json());
app.use(cors()); // this should solve the cors issues



app.use('/api', require('./routes/apiRoutes'));


// // SOME error logging stuff
// app.use( (err,req,res,next) => {
//     log.error('app.js - this error occured: ');
//     log.error(`Error Body: ${err.body}`);
//     log.error(`Error Message: ${err.message}`);
//     log.error(`Error Status: ${err.status}`);
//     log.error(`Error stack: ${err.stack}`);
//
//     if (err.name === 'SequelizeValidationError') {
//         res.status(422);
//         return res.json(err.errors);
//     }
//
//     return  res.status(500).send({message: 'Internal server error'});
// });



//This is for set up the  server and the port
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Money-safer app listening on port ${port}!`)
});