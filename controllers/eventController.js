import Event from "../models/event.js";
import { isAdmin } from "./userController.js";

export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Event.findOne().sort({ id: -1 })
        .then((event) => {
            req.body.id = event ? event.id + 1 : 1;
            const newEvent = new Event(req.body);
            newEvent.save()
                .then((event) => {
                    res.status(201).json({
                        message: "Event Creation Successful",
                        event: event
                    })
                })
                .catch((err) => {
                    if (err.message.includes("name_1")) {
                        res.status(409).json({ message: "Event name is already used" })
                    }
                    else {
                        res.status(500).json({ message: "Server error occurred", error: err.message });
                    }
                })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function retrieve(req, res) {
    Event.find({ disabled: req.query.disabled })
        .then((events) => {
            if (events.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(201).json(events);
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}