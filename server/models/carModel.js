const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
{
    manufacturer: {type: String, required: true},
    model: {type: String, required: true},
    bodywork: {type: String, required: true},
    color: {type: String, required: true},
    productionYear:{type: Number, required: true},
    countryOfOrigin: {type: String, required: true},
    engineModel:{type: String, required: true},
    engineCapacity:{type: String, required: true},
    enginePower:{type: String, required: true},
    transmission: {type: String, required: true},
    drive: {type: String, required: true},
    fuel: {type: String, required: true},
    fuelUsage: {type: String, required:true},
    steeringWheel: {type: String, required: true},
    condition:{type: String, required: true},
    mileage:{type:Number, required:true},
    onSale: {type: Boolean, default:false},
    price: {type: Number, default:""},
    ownerID: {type: String,required:true},
    MOT:[{
        name:{type:String},
        date:{type:Date},
        desc:{type:String},
        img:[{type:String}]
    }],
    insurances:[{
    insuranceType:{type: String, required:true},
    company:  {type: String, required:true},
    value: {type: String, required:true},
    info:{type:String, default:""},
    startDate:{type: Date,required:true},
    endDate:{type: Date,required:true}
    }],
    ownerCount: {type:Number,required:true},
    licensePlates:{type:String, required:true, unique:true},
    VIN:{type:String, required:true, unique:true}
});

const car = mongoose.model("car", carSchema)
module.exports = car;