const mongoose = require("mongoose");

const iconSchema = {
    name: {
        required: true,
        type: String 
    },

    img: {
        data: Buffer,
        contentType: String,
        required: true
    },

    desc: String
};

const IconModel = new mongoose.model("icon", iconSchema);

module.exports = IconModel;
