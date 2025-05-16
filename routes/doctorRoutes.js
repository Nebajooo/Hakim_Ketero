const express = require("express");
const auth = require("../middleware/auth.js");
const doctorController = require("../controllers/doctorController.js");

const doctorRouter = express.Router();

// Use the correct controller function for each route
doctorRouter.get("/getalldoctors", doctorController.getAllDoctors);
doctorRouter.get("/getnotdoctors", auth, doctorController.getNotDoctors);
doctorRouter.post("/applyfordoctor", auth, doctorController.applyForDoctor);
doctorRouter.put("/deletedoctor", auth, doctorController.deleteDoctor);
doctorRouter.put("/acceptdoctor", auth, doctorController.acceptDoctor);
doctorRouter.put("/rejectdoctor", auth, doctorController.rejectDoctor);

module.exports = doctorRouter;
