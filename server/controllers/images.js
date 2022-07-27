const User = require("../models/userModel");
const ErrorResponse = require("../handlers/error");
const fs = require("fs");

exports.uploadProfileImage = async (req, res, next) => {
    const { name, desc, _id } = req.body;
    const { fileName } = req.file;
    console.log("Uploaded image: ", fileName, req.file);
    const fileData = fs.readFileSync(path.join(`${__dirname.split("/server")[0]}/habity/assets/uploads/${fileName}`));
    const imageObj = {
        name,
        desc,
        img: {
            data: fileData,
            contentType: 'image/png'
        }
    };

    try {
        const user = await User.find({ _id });
        if (!user) return next(new ErrorResponse("Could not upload image", 404));
        user.overwrite({ profileImage: imageObj });
        await user.save();

        res.status(200).json({ success: true, data: "Image profile image has been deleted" });
    } catch (e) {
        next(e);
    }
};

exports.deleteProfileImage = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const user = await User.find({ _id });
        if (!user) return next(new ErrorResponse("Could not delete image", 404));
        user.profileImage = undefined;
        await user.save();
        res.status(200).json({ success: true, data: "Your profile image has been deleted" });
    } catch (e) {
        next(e);
    }
};