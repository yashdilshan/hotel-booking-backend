import User from "../models/user.js";
import passwordHash from "password-hash"
import jwt from "jsonwebtoken"

export async function persist(req, res) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNoRegex = /^0\d{9}$/;

    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: "Please enter valid email address" })
    }
    if (!phoneNoRegex.test(req.body.phoneNo)) {
        return res.status(400).json({ message: "Please enter valid phone number" })
    }

    req.body.password = passwordHash.generate(req.body.password); // Password hash
    req.body.id = 1;

    try {
        let user = await User.findOne().sort({ id: -1 }); // Get last user
        if (user) {
            req.body.id += user.id;
        }

        const newUser = new User(req.body);
        user = await newUser.save(); // Save User
        res.status(201).json({ message: "User Registration Success" })

    } catch (error) {
        const errorMessage = error.message;
        if (errorMessage.includes("email_1")) {
            res.status(409).json({ message: "Email is already used" })
        }
        else if (errorMessage.includes("phoneNo_1")) {
            res.status(409).json({ message: "Phone number is already used" })
        }
        else {
            res.status(500).json({ message: "User Registration Fail", error: errorMessage })
        }
    }
}

export function login(req, res) {

    User.findOne({
        $or: [
            { email: req.body.input },
            { phoneNo: req.body.input }
        ]
    }).then((user) => {
        if (!user || user.disabled) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!passwordHash.verify(req.body.password, user.password)) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const payload = {
            id: user.id,
            firstName: user.firstName,
            type: user.type
        }

        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '20h' }) // JWT Token

        res.status(200).json({
            message: "Login success",
            token: token
        })

    }).catch((err) => {
        res.status(500).json({ message: "User Login Fail", error: err })
    })
}

export function isHaveUser(req) {
    if (req.user) { // check request is have user
        return true;
    }
    return false;
}

export function isAdmin(req) {
    if (req.user && ree.user.type == "admin") { // check is admin
        return true;
    }
    return false;
}

export function isUser(req) {
    if (req.user && ree.user.type == "user") { // check is normal user like customer
        return true;
    }
    return false;
}
