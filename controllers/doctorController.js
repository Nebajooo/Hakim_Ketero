const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

const getAllDoctors = async (req, res) => {
  try {
    // Fetch all doctors from your database
    const doctors = await Doctor.find(); // Assumes a `Doctor` model exists
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res
      .status(500)
      .json({ message: "Server error: Could not retrieve doctors" });
  }
};
const getNotDoctors = async (req, res) => {
  try {
    const docs = await Doctor.find({
      isDoctor: false,
      _id: { $ne: req.locals },
    }).populate("userId");
    return res.send(docs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get non-doctors");
  }
};

const applyForDoctor = async (req, res) => {
  try {
    const alreadyFound = await Doctor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const doctor = new Doctor({ ...req.body.formDetails, userId: req.locals });
    const result = await doctor.save();

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to submit application");
  }
};

const acceptDoctor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: true, status: "accepted" }
    );

    await Doctor.findOneAndUpdate({ userId: req.body.id }, { isDoctor: true });

    const notification = new Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while sending notification");
  }
};

const rejectDoctor = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: false, status: "rejected" }
    );
    await Doctor.findOneAndDelete({ userId: req.body.id });

    const notification = new Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while rejecting application");
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, { isDoctor: false });
    await Doctor.findOneAndDelete({ userId: req.body.userId });
    await Appointment.findOneAndDelete({ userId: req.body.userId });

    return res.send("Doctor deleted successfully");
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).send("Unable to delete doctor");
  }
};

module.exports = {
  getAllDoctors,
  getNotDoctors,
  deleteDoctor,
  applyForDoctor,
  acceptDoctor,
  rejectDoctor,
};
