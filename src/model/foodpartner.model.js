import mongoose from 'mongoose';

const foodpartnerschema = new mongoose.Schema({
      fullname: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
      },
      password: {
            type: String,
            required: true,
      }
});

const FoodPartner = mongoose.model('FoodPartner', foodpartnerschema);
export default FoodPartner;