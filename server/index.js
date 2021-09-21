const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log('Server started on port:',PORT));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors(
    {
        origin: ["http://localhost:3000",
            "https://sesu.netlify.app"],
        credentials: true,
    }
));

mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) return console.error(err);
    else console.log("Connected to database");
}
);

app.use("/auth",require("./routers/userRouter"));
app.use("/car",require("./routers/carRouter"));
app.use("/tran",require("./routers/transactionRouter"));