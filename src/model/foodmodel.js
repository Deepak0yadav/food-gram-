import mongoose, { Schema } from "mongoose";

const foodschema = new mongoose.Schema({
      name: {
            type: String,
            required: true,   
      },
      video:{
            type: String,
            required: true,   
      },
      description: {
            type: String,
      },
      foodpartner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'FoodPartner',
            required:true,
      }
})

const Food = mongoose.model('Food', foodschema);
export default Food;