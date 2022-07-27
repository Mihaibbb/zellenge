const User = require("../models/userModel"); 
const ErrorResponse = require("../handlers/error");
const sendEmail = require("../handlers/sendEmail");

exports.register = async (req, res, next) => {
    const { name, username, email, password } = req.body;
    console.log(req.body);
    try {

        const user = await User.create({
            name,
            username,
            email,
            password,
            date: Date.now()
        });

        await user.save();

        sendToken(user, 201, res);

    } catch (e) {
        next(e);
    }

};

exports.login = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) return next(ErrorResponse("Please fill every field!", 400));

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorResponse("Invalid credentials!", 401));
       
        const samePassword = await user.matchPassword(password);
        
        if (!samePassword) return next(new ErrorResponse("Email or password is incorrect!", 404));
        
        sendToken(user, 200, res);
        
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.sendEmailCode = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email : email });
        
        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const codeToken = user.getEmailNumber();
        await user.save();
        const verifyUrl = `${process.env.EMAIL_CODE_URL}/${codeToken}`;
        const message = `
            <h1>You have requested password reset</h1>
            <p>Hello, ${user.name}! Habity wants to verify if this is your email.</p><br>
           
            <p>Here is the code: <a href=${verifyUrl} clicktracking=off>${codeToken}</a></p>
        `;
        const subject = `Habity: Verify your account`;

        try {
            sendEmail({
                to: user.email,
                subject: subject,
                text: message,
            });

            res.status(200).json({ success: true, data: "Email sent!" });

        } catch(e) {
            user.emailNumberExpire = undefined;
            user.emailNumberToken = undefined;    
            await user.save();
    
            return next(new ErrorResponse("Error sending the email", 500));
        }

    } catch(e) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }
};

exports.checkEmail = async (req, res, next) => {
    const { email } = req.body;
    const emailNumber = req.params.emailNumber;
    const emailNumberToken = crypto.createHash("256").update(emailNumber).digest("hex");

    try {
        const user = await User.findOne({
            email,
            emailNumberToken,
            emailNumberExpire: { $gt: Date.now() }
        });

        if (!user) return next(new ErrorResponse("Invalid Token"), 400);
        

        user.emailNumberExpire = undefined;
        user.emailNumberToken = undefined;

        await user.save();
        res.status(201).json({
            success: true,
            
        });

    } catch(e) {
        next(e);
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email : email });
        
        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `${process.env.RESET_URL}/${resetToken}`;
        const message = `
            <h1>You have requested password reset</h1>
            <p>Hello, ${user.name}! Habity saw that you asked for a password reset.</p><br>
            <p>For reseting it, please click <a href=${resetUrl} clicktracking=off> here </a></p><br>
            <p>Here is the link: <a href=${resetUrl} clicktracking=off>${resetUrl}</a></p>
        `;
        const subject = `Habity: Password reset request`;

        try {
            sendEmail({
                to: user.email,
                subject: subject,
                text: message,
            });

            res.status(200).json({ success: true, data: "Email sent!" });

        } catch(e) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
    
            await user.save();
    
            return next(new ErrorResponse("Error sending the email", 500));
        }

    } catch(e) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }
    
};

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        });

        if (!user) return next(new ErrorResponse("Invalid Reset Token", 400));

        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password reset success",
            token: user.getSignedToken(),
        });
    } catch (err) {
        next(err);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    console.log(token);
    res.status(statusCode).json({ success: true, token });
}; 