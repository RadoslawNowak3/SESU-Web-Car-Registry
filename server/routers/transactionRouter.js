const router = require("express").Router();
const auth = require("../middleware/auth")
const Transaction = require("../models/transactionModel");

router.post("/", auth, async (req,res)=>{
    try{
            const oldowner = req.user;
            const newowner = req.body.newOwner;
            const carid = req.body.carID;
            const carmodel = req.body.carModel;
            const carmanufacturer = req.body.carManufacturer;
            const datesent = req.body.dateSent;
            if(oldowner==req.body.owner) {
                const duplicheck = await Transaction.findOne({oldOwner: oldowner, newOwner: newowner, carID: carid});
                if (duplicheck)
                    res.status(409).send({errorMessage: "409"});
                else {
                    const newTransaction = new Transaction
                    ({
                        oldOwner: oldowner,
                        newOwner: newowner,
                        carID: carid,
                        carModel: carmodel,
                        carManufacturer: carmanufacturer,
                        dateSent: datesent
                    })
                    console.log(newTransaction)
                    await newTransaction.save();
                    res.status(200).send({message: "200"});
                }
            }
            else
            {
                res.status(401).send({errorMessage:"Unauthorized"})
            }
        }
    catch (err) {
        console.error(err);
        res.status(500).send({errorMessage:"500"});
    }
});
router.get("/usertrans/received", auth, async(req,res)=>{
    try{
        const user = req.user;
        const trans = await Transaction.find({
            newOwner:user
        })
        res.json(trans);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
router.get("/usertrans/sent", auth, async(req,res)=>{
    try{
        const user = req.user;
        const trans = await Transaction.find({
            oldOwner:user
        })
        res.json(trans);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
router.put("/:id", auth, async (req,res)=>{
    try{
        console.log("test")
            const trans = await Transaction.findById(req.params.id);
            if(!trans.finished) {
                trans.finished = true;
                await trans.save();
                res.status(200).send({message: "200"});
            }
            else
            res.status(409).send({errorMessage: "409"});
    }
    catch (err) {
        console.error(err);
        res.status(500).send({errorMessage:"500"});
    }
});
module.exports = router;