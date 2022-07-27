const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 

const userSchema = new mongoose.Schema({
    name: {
        required: [true, "Please insert your name!"],
        type: String,
    },

    username: {
        required: [true, "Please insert a unique username!"],
        type: String,
        unique: true
    },

    email: {
        required: [true, "Please insert your email!"],
        type: String,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ]
    },

    password: {
        required: [true, "Please insert a password!"],
        type: String,
        minLength: 8,
        select: false
    },

    date: {
        required: true,
        type: Date
    },

    profileImage: {
        name: String,
        desc: String,
        img: {
            data: Buffer,
            contentType: String
        }
    },
    
    friends: {
        type: [mongoose.Schema.ObjectId],
    },

    tasks: {
        type: mongoose.Schema.Types.Mixed
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailNumberToken: Number,
    emailNumberExpire: Date,
}); 

// Hashing password

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    
});

// Match between client and server password

userSchema.methods.matchPassword = async function (password)  {
    return await bcrypt.compare(password, this.password);
};

// JSON Web Token

userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.
        createHash("sha256").
        update(resetToken).
        digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    
    return resetToken;
};

userSchema.methods.getEmailNumber = function() {
    const emailNumber = randomNumber(process.env.MIN_NUMBER, process.env.MAX_NUMBER);
    this.emailNumberToken = crypto.createHash("sha256").update(emailNumber).digest("hex");
    this.emailNumberExpire = Date.now() + 10 * (60 * 1000);

    return emailNumber;
};

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const User = mongoose.model("User", userSchema);
module.exports = User ; 