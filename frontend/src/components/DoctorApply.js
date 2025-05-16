import React, { useState } from "react";
import toast from "react-hot-toast";
import "../styles/doctorapply.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function DoctorApply() {
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
    timing: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { specialization, experience, fees, timing } = formDetails;

    if (!specialization || !experience || !fees || !timing) {
      return toast.error("All fields are required.");
    }

    try {
      await toast.promise(
        axios.post(
          "/api/doctor/applyfordoctor",
          { specialization, experience, fees, timing },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          loading: "Submitting application...",
          success: "Thank you! Application submitted.",
          error: "Failed to submit application.",
        }
      );

      // Optionally reset form
      setFormDetails({
        specialization: "",
        experience: "",
        fees: "",
        timing: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  return (
    <section className="apply-doctor-section flex-center">
      <div className="apply-doctor-container flex-center">
        <h2 className="form-heading">Apply For Doctor</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="specialization"
            className="form-input"
            placeholder="Enter your specialization"
            value={formDetails.specialization}
            onChange={inputChange}
          />
          <input
            type="text"
            name="experience"
            className="form-input"
            placeholder="Enter your experience (in years)"
            value={formDetails.experience}
            onChange={inputChange}
          />
          <input
            type="text"
            name="fees"
            className="form-input"
            placeholder="Enter your consultation fee"
            value={formDetails.fees}
            onChange={inputChange}
          />
          <select
            name="timing"
            value={formDetails.timing}
            className="form-input"
            onChange={inputChange}
          >
            <option value="" disabled>
              Select Timing
            </option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          <button type="submit" className="btn form-btn">
            Apply
          </button>
        </form>
      </div>
    </section>
  );
}

export default DoctorApply;
