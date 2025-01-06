import Review from "../models/review.js";
import { isUser } from "./userController.js";

export function persist(req, res) {
    if (!isUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }
    console.log(req.user);

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
    Review.find({ disabled: req.query.disabled })
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