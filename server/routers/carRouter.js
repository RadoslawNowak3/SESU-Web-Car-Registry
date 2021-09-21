const router = require("express").Router({mergeParams: true});
const car = require("../models/carModel");
const auth = require("../middleware/auth");
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/files');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

router.post("/", auth, async (req,res)=>{
try{
    const owner = req.user;
    const {manufacturer, model, bodywork, color:color, productionYear,
        countryOfOrigin, engineModel, engineCapacity, enginePower,
        transmission, drive, fuel, fuelUsage, steeringWheel,
        condition, licensePlates, VIN, ownerCount, mileage:mileage} = req.body;
    const onSale = false
    const duplicheck = await car.findOne({VIN:VIN});
    if(duplicheck)
        res.status(409).send({errorMessage:"409"});
    else {
        const newCar = new car({
                manufacturer,
                model,
                bodywork,
                color:color,
                productionYear,
                countryOfOrigin,
                engineModel,
                engineCapacity,
                enginePower,
                transmission,
                drive,
                fuel,
                fuelUsage,
                steeringWheel,
                condition,
                onSale,
                ownerID: owner,
                licensePlates,
                VIN,
                ownerCount:ownerCount,
                mileage: mileage
            }
        );
        await newCar.save();
        res.status(200).send({message:"200"});
    }
}
catch (err) {
    console.error(err);
    res.status(500).send({errorMessage:"500"});
}
});

router.get("/", auth, async(req,res)=>{
    try{
        const test = req.user;
        const cars = await car.find({ownerID:test});
        res.json(cars);
    }
catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
router.get("/carsearch", auth, async(req,res)=>{
    try{
        const cars = await car.find({onSale:true});
        res.json(cars);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

/* router.get('/:id', auth, async(req,res)=>{
    try{
        const result = await car.findOne({_id:req.params.id})
        if(result.length===0)
            return res.status(404).json({errorMessage: "Car not found"});
        if(result.onSale===false && result.ownerID!==req.user)
        {
            return res.status(401).json({errorMessage: "Unauthorised"});
        }
        delete result._id;
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
*/

router.put("/edit/:id", auth, async(req,res)=>{
    try {
        const updatedCar = await car.findById(req.params.id);
        if(updatedCar) {
            updatedCar.color = req.body.color ? req.body.color : updatedCar.color;
            updatedCar.engineModel = req.body.engineModel ? req.body.engineModel : updatedCar.engineModel;
            updatedCar.engineCapacity = req.body.engineCapacity ? req.body.engineCapacity : updatedCar.engineCapacity;
            updatedCar.enginePower = req.body.enginePower ? req.body.enginePower : updatedCar.enginePower;
            updatedCar.transmission = req.body.transmission ? req.body.transmission : updatedCar.transmission;
            updatedCar.drive = req.body.drive ? req.body.drive : updatedCar.drive;
            updatedCar.fuel = req.body.fuel ? req.body.fuel : updatedCar.fuel;
            updatedCar.fuelUsage = req.body.fuelUsage ? req.body.fuelUsage : updatedCar.fuelUsage;
            updatedCar.steeringWheel = req.body.steeringWheel ? req.body.steeringWheel : updatedCar.steeringWheel;
            updatedCar.condition = req.body.condition ? req.body.condition : updatedCar.condition;
            updatedCar.onSale = req.body.onSale;
            updatedCar.price =  req.body.price ? req.body.price : updatedCar.price;
            await updatedCar.save();
            res.status(200).send();
        }
        else
        {
            res.status(404).send();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }
})
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

router.put("/mot/:id", auth, upload.array('files'), async(req,res)=>{
    try {
        const result = await car.findById(req.params.id)
        let files = req.files;
        let imagearray=[];
        for (let currfile in files) {
            const params = {
                ACL :'public-read',
                Bucket:"mern-bucket-258",
                Key: files[currfile].filename,
                Body: fs.readFileSync(path.join(__dirname + '/  ../public/files/' + files[currfile].filename)),
            };
            imagearray.push("https://mern-bucket-258.s3.amazonaws.com/"+params.Key.toString());
            await s3.upload(params, function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(`File uploaded successfully. ${data.Location}`);
            });
        }
        const newMOT={
            name:req.body.name,
            date:req.body.date,
            desc:req.body.desc,
            img:imagearray
        }
        result.MOT.push(newMOT)
        result.save();
        res.status(200).send("Success!");
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
router.put('/insurance/:id', auth, async(req,res)=>{
    try {
        const update = await car.findById(req.params.id)
        const newInsurance = {
            insuranceType: req.body.type,
            company: req.body.company,
            value: req.body.value,
            info: req.body.info,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };
        if (update.insurances.includes(newInsurance))
            return res.status(409).json({errorMessage: "Duplicate entry"});
        else {
            const updateDocument = {
                $addToSet : {insurances:[newInsurance]}
            };
            const result = await car.findByIdAndUpdate(req.params.id, updateDocument);
            res.json(result);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

router.put("/transfer", auth, async(req,res)=>{
    try{
        if(req.body.currOwner === req.body.oldOwner)
        {
            res.status(400).json({errorMessage:"Invalid request"}).send();
        }
        const targetcar = await car.findById(req.body.carID);
        await targetcar.updateOne({ownerID: req.body.newOwner, $inc: {ownerCount:1}} )
        await targetcar.save()
        res.status(200).send("Success!");
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})


module.exports = router;
