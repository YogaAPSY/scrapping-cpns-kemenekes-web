const connectDB = require('../db/connection');
const mongoose = require('mongoose');

connectDB()

// create an schema
const userSchema = new mongoose.Schema({
            total: Number,
            find: String
        });
 
const userModel=mongoose.model('total',userSchema);
 
module.exports = {
    getTotal: async function() {
        try{
            const result = await userModel.find({find:'Mongoose'})
            return await result[0].total;
        }catch(e){
            return false
        }
      
    },
    setTotal: async function(totals) {

        const result = new userModel({
            total: totals,
            find: "Mongoose"
        });

        await result.save();
    },
    editTotal: function(total){
        const result = userModel.findOne({find:'Mongoose'}, async function(err,obj){
        obj.total = total
        
        await obj.save();
    })
    }
}