import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import fallbackDoctors from "../data/fallbackDoctors";
import { useAppointmentContext } from "../context/AppointmentContext";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addAppointment } = useAppointmentContext();

  const storedDoctors =
    JSON.parse(localStorage.getItem("doctors")) || fallbackDoctors;

  const doctor = storedDoctors.find((doc) => doc.id === Number(id));

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    gender: "",
    address: "",
    appointmentDate: "",
    timeSlot: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  if (!doctor) {
    return <h2>Doctor not found</h2>;
  }

  const availableSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const formatSelectedDate = (date) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

  const handleDateSelect = (date) => {
    setFormData((prev) => ({
      ...prev,
      appointmentDate: formatSelectedDate(date),
    }));
  };

  const handleSlotSelect = (slot) => {
    setFormData((prev) => ({
      ...prev,
      timeSlot: slot,
    }));
  };

 const validateStepOne = () => {
  const newErrors = {};

  if (!formData.patientName.trim()) {
    newErrors.patientName = "Patient name is required";
  }

  if (!formData.patientAge.trim()) {
    newErrors.patientAge = "Age is required";
  } else {
    const age = Number(formData.patientAge);

    if (isNaN(age) || age <= 0) {
      newErrors.patientAge = "Age must be greater than 0";
    } else if (age > 120) {
      newErrors.patientAge = "Please enter a valid age";
    }
  }

  if (!formData.gender) {
    newErrors.gender = "Gender is required";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const validateStepTwo = () => {
    const newErrors = {};

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Please choose a date";
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Please choose a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepThree = () => {
    const newErrors = {};

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for visit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStepOne()) return;
    if (step === 2 && !validateStepTwo()) return;

    setErrors({});
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStepThree()) return;

    const newAppointment = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      location: doctor.location,
      image: doctor.image,
      ...formData,
      status: "Upcoming",
    };

    addAppointment(newAppointment);
    navigate("/dashboard");
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <div className="booking-left">
          <p className="booking-tag">Book Appointment</p>
          <h1>{doctor.name}</h1>
          <p className="booking-specialty">{doctor.specialty}</p>
          <p className="booking-location">{doctor.location}</p>
          <img
            src={doctor.image}
            alt={doctor.name}
            className="booking-doctor-image"
          />
        </div>

        <div className="booking-right">
          <div className="step-indicator">
            <span className={step >= 1 ? "active-step" : ""}>1</span>
            <span className={step >= 2 ? "active-step" : ""}>2</span>
            <span className={step >= 3 ? "active-step" : ""}>3</span>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-step">
                <h2>Patient Details</h2>

                <input
                  type="text"
                  name="patientName"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={handleChange}
                />
                {errors.patientName && (
                  <p className="form-error">{errors.patientName}</p>
                )}

                <input
                  type="number"
                  name="patientAge"
                  placeholder="Enter age"
                  value={formData.patientAge}
                  onChange={handleChange}
                  min ="1"
                />
                {errors.patientAge && (
                  <p className="form-error">{errors.patientAge}</p>
                )}

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="form-error">{errors.gender}</p>
                )}

                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="form-error">{errors.address}</p>
                )}

                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h2>Select Appointment</h2>

                <div className="appointment-selector">
                  <h3>Choose Date</h3>

                  <div className="calendar-wrapper">
                    <Calendar
                      onChange={handleDateSelect}
                      value={
                        formData.appointmentDate
                          ? new Date(formData.appointmentDate)
                          : null
                      }
                      minDate={new Date()}
                    />
                  </div>

                  {errors.appointmentDate && (
                    <p className="form-error">{errors.appointmentDate}</p>
                  )}

                  <h3>Choose Time</h3>
                  <div className="time-options">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`time-pill ${
                          formData.timeSlot === slot ? "selected-pill" : ""
                        }`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {errors.timeSlot && (
                    <p className="form-error">{errors.timeSlot}</p>
                  )}
                </div>

                <div className="form-buttons">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h2>Reason for Visit</h2>

                <textarea
                  name="reason"
                  rows="5"
                  placeholder="Describe the reason for your appointment"
                  value={formData.reason}
                  onChange={handleChange}
                />
                {errors.reason && (
                  <p className="form-error">{errors.reason}</p>
                )}

                <div className="booking-summary">
                  <p>
                    <strong>Doctor:</strong> {doctor.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {formData.appointmentDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {formData.timeSlot}
                  </p>
                  <p>
                    <strong>Patient:</strong> {formData.patientName}
                  </p>
                  <p>
                    <strong>Address:</strong> {formData.address}
                  </p>
                </div>

                <div className="form-buttons">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button type="submit" className="primary-btn">
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;