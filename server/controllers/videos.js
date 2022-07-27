const User = require("../models/userModel");
const ErrorResponse = require("../handlers/error");

exports.uploadVideo = async ( req, res, next ) => {
    if (!req.files) return;
    const file = req.files.file;
    const filename = file.name;
    console.log(file, filename);
    file.mv("../../zellenges/img/" + filename, (err) => {
        console.log(err);
        if (err) console.log(err);
        else {
            console.log("File uploaded!");
        }
     })
    
};