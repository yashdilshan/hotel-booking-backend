import Review from "../models/review.js";
import { isAdmin, isUser, isHaveUser } from "./userController.js";

export function persist(req, res) {
    if (!isUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }

    req.body.email = req.user.email;
    req.body.name = req.user.name;

    Review.findOne().sort({ id: -1 })
        .then((review) => {
            req.body.id = review ? review.id + 1 : 1;
            const newReview = new Review(req.body);
            newReview.save()
                .then((review) => {
                    res.status(201).json({
                        message: "Review Save Successful",
                        review: review
                    })
                })
                .catch((err) => {
                    res.status(500).json({ message: "Server error occurred", error: err.message });
                })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function retrieve(req, res) {
    Review.find({ disabled: req.query.disabled }).sort({ id: -1 })
        .then((reviews) => {
            if (reviews.length === 0) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.status(200).json(reviews);
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function findByName(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    const namePart = req.params.name;
    const regex = new RegExp(namePart, "i"); // "i" makes it case-insensitive

    Review.find({ name: regex }).sort({ id: -1 })
        .then((reviews) => {
            if (reviews.length === 0) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.status(200).json({
                message: "Reviews found",
                reviews: reviews
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        });
}

export function findByEmail(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }

    Review.find({ email: req.params.email })
        .then((reviews) => {
            if (reviews.length === 0) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.status(200).json(reviews);
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function update(req, res) {
    if (!isUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }
    delete req.body.disabled;

    Review.updateOne({ id: req.body.id }, req.body)
        .then(() => {
            res.status(200).json({ message: "Review Update Successful" });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function enableDisable(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    const state = req.body.disabled
    Review.updateOne({ id: req.body.id }, req.body)
        .then(() => {
            res.status(200).json({ message: `Review ${state ? "disable" : "enable"} Successful` });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export async function remove(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }

    Review.deleteOne({ id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "Review Delete Successful" });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}