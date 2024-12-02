import User from "../models/user.js";
import passwordHash from "password-hash"

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
        res.json({ message: "User Create Success" })

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


