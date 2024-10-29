const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    firstName: { type: String },
    lastName: { type: String },
    contactNumber: { type: String },
    address: {
        doorNo: { type: String },
        streetName: { type: String },
        city: { type: String },
        country: { type: String },
        pincode: { type: String },
    },
    
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
