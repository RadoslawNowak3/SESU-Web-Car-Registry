const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        oldOwner: {type: String, required:true},
        newOwner:{type:String, required:true},
        carID:{type:String, required:true},
        carModel:{type:String, required:true},
        carManufacturer:{type:String, required:true},
        dateSent: {type: Date, required:true},
        finished:{type:Boolean,default:false}
    }
)
const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;