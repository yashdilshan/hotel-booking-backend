import Category from "../models/category.js";
import { isAdmin } from "./userController.js";

export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Category.findOne().sort({ id: -1 }) // find last user
        .then((category) => {
            req.body.id = category ? category.id + 1 : 1 // set new category id

            const newCategory = new Category(req.body);
            newCategory.save() // save new category
                .then((category) => {
                    res.status(201).json({
                        message: "Category Creation Successful",
                        category: category
                    })
                })
                .catch((err) => {
                    const errorMessage = err.message;
                    if (errorMessage.includes("name_1")) {
                        res.status(409).json({ message: "Category name is already used" })
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

export function retrieve(req, res) {
    Category.find()
        .then((categories) => {
            if (categories.length === 0) {
                return res.status(404).json({ message: "No categories found" });
            }
            res.status(200).json(categories);
        }).catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function findByName(req, res) {
    Category.findOne({ name: { $regex: new RegExp(`^${req.params.name}$`, 'i') } }) // name case sensitivity remove.
        .then((category) => {
            if (!category) {
                return res.status(404).json({ message: "Category Not found" });
            }
            res.status(200).json({
                message: "Category found",
                category: category
            });
        }).catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        });
}

export function update(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Category.updateOne({ id: req.body.id }, req.body)
        .then(() => {
            res.status(200).json({ message: "Category Update Successful" });
        })
        .catch((err) => {
            const errorMessage = err.message;
            if (errorMessage.includes("name_1")) {
                res.status(409).json({ message: "Category name is already used" })
            }
            else {
                res.status(500).json({ message: "Server error occurred", error: errorMessage });
            }
        });
}

export function remove(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Category.deleteOne({ id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "Category Delete Successful" });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function getAll(req, res){
    console.log(req);
}