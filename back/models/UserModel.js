import mongoose from "mongoose";
//user model
const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});
// convert _id to id for better use in frontend
User.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
export default mongoose.model('Users', User);