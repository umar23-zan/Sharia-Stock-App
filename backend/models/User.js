const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String }, // Add contact number
    address: {                       // Add address object
        doorNo: { type: String },
        streetName: { type: String },
        city: { type: String },
        country: { type: String },
        pincode: { type: String },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
