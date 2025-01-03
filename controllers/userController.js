import User from "../models/user.js";
import passwordHash from "password-hash"
import jwt from "jsonwebtoken"

export function persist(req, res) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/
    const contactNoRegex = /^0\d{9}$/;

    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: "Please enter valid email address" })
    }
    if (!contactNoRegex.test(req.body.contactNo)) {
        return res.status(400).json({ message: "Please enter valid contact number" })
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({ message: "Please enter more than 8 characters for password" })
    }
    req.body.image = req.body.title == "Mr" ? "https://img.icons8.com/emoji/48/man-with-beard-light-skin-tone.png" : "https://img.icons8.com/emoji/48/woman-light-skin-tone.png"
    req.body.password = passwordHash.generate(req.body.password); // Password hash

    User.findOne().sort({ id: -1 }) // find last user
        .then((user) => {
            req.body.id = user ? user.id + 1 : 1  // set user id

            const newUser = new User(req.body);
            newUser.save() // save new user
                .then(() => {
                    res.status(201).json({ message: "User Registration Success" })
                })
                .catch((err) => {
                    const errorMessage = err.message;
                    if (errorMessage.includes("email_1")) {
                        res.status(409).json({ message: "Email is already used" })
                    }
                    else if (errorMessage.includes("contactNo_1")) {
                        res.status(409).json({ message: "Contact No is already used" })
                    }
                    else {
                        res.status(500).json({ message: "Server error occurred", error: errorMessage });
                    }
                })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function login(req, res) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/
    const contactNoRegex = /^0\d{9}$/;

    if (!emailRegex.test(req.body.emailOrContactNo) && !contactNoRegex.test(req.body.emailOrContactNo)) {
        return res.status(400).json({ message: "Please enter valid email or contact no." })
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({ message: "Please enter valid password" })
    }

    User.findOne({ // find user from email or contact number
        $or: [
            { email: req.body.emailOrContactNo },
            { contactNo: req.body.emailOrContactNo }
        ]
    }).then((user) => {
        if (!user || user.disabled) {
            return res.status(400).json({ message: "User not found" });
        }
        else if (!passwordHash.verify(req.body.password, user.password)) { // check password
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const payload = {
            id: user.id,
            name: user.firstName + " " + user.lastName,
            type: user.type,
            image: user.image,
            phoneNo: user.phoneNo
        }

        const token = jwt.sign(payload, process.env.JWT_KEY) // Generate Token

        res.status(200).json({
            message: "Login success",
            userType: user.type, // for identify authorized users
            token: token
        })

    }).catch((err) => {
        res.status(500).json({ message: "Server error occurred", error: err.message });
    })
}

// ------------- users checking functions -------------

export function isHaveUser(req) {
    if (req.user) { // check request is have user
        return true;
    }
    return false;
}

export function isAdmin(req) {
    if (req.user && req.user.type == "admin") { // check is admin
        return true;
    }
    return false;
}

export function isUser(req) {
    if (req.user && req.user.type == "user") { // check is normal user like customer
        return true;
    }
    return false;
}