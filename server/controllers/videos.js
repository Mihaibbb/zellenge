const User = require("../models/userModel");
const ErrorResponse = require("../handlers/error");
const cloudinary = require("cloudinary").v2;

exports.uploadVideo = async ( req, res, next ) => {
    console.log(req.body);
    const { video, username, title }   = req.body;
    const realVideo = video;
    console.log("here");
    cloudinary.uploader.upload(realVideo, { 
        resource_type: "video", 
        chunk_size: 6000000,
        public_id: "/zellenge/",
        eager: [
        { 
            crop: "pad", 
            audio_codec: "none" 
        } ],                                   
        eager_async: true 
    },
    (err, result) => {
        console.log(err, result);
    });
    const user = await User.findOne({ username });
    if (!user) return;
    if (!user["videos_sent"]) user["videos_sent"] = [];
    const newVideosSents = [...await user["videos_sent"], {
        date: new Date(),
        link: realVideo,
        title: title
    }];
    await user.save();
    await User.updateOne({ username }, { videos_sent: newVideosSents });


    const usersMap = await User.find({});
    const otherUsers = usersMap.filter(user => user.username !== username);
    const randomNumber = randomBetween(0, otherUsers.length - 1);
    await User.updateOne({username: otherUsers[randomNumber].username}, [...otherUsers[randomNumber].videos_recieved, {
        link: realVideo,
        from: username,
        date: new Date(),
        title: title
    }]);
    
    
    console.log(otherUsers);
};

const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};