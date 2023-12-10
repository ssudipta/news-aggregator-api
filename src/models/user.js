var mongoose = require("mongoose")
const Schema = mongoose.Schema

var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, " Full Name not provided"]
    },
    email: {
        type: String,
        required: [true, "Email not provided"],
        lowercase: true,
        trim: true,
        unique: [true, "Email already exist"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Email not valid"
        }
    },
    password:{
        type: String,
        required: [true, "Password not provided"]
    },
    role: {
        type: String,
        required: [true, "Role not provided"],
        enum: ["admin","normal"]
    },
    preferences: {
        type: [String],
        required: [true, "Preferences not provided"]
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)