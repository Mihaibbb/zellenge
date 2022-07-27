const mongoose = require("mongoose");


module.exports = async () => {

    const connectionParams = {
        useNewUrlParser: true,
    };

    try {
        await mongoose.connect(process.env.DB, connectionParams);
    } catch (e) {
        console.log(e);
    }
};