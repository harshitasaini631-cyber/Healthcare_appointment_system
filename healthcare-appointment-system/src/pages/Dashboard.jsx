import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppointmentContext } from "../context/AppointmentContext";

function Dashboard() {
  const { appointments, updateAppointment, deleteAppointment } =
    useAppointmentContext();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    appointmentDate: "",
    timeSlot: "",
    reason: "",
  });

  const availableSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
  ];

  const formatSelectedDate = (date) => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleEditClick = (appointment) => {
    setEditingId(appointment.id);
    setEditData({
      appointmentDate: appointment.appointmentDate,
      timeSlot: appointment.timeSlot,
      reason: appointment.reason,
    });
  };

  const handleSaveEdit = (appointment) => {
    const updatedAppointment = {
      ...appointment,
      appointmentDate: editData.appointmentDate,
      timeSlot: editData.timeSlot,
      reason: editData.reason,
    };

    updateAppointment(updatedAppointment);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({
      appointmentDate: "",
      timeSlot: "",
      reason: "",
    });
  };

  const handleDelete = (id) => {
    deleteAppointment(id);
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Appointments</h1>
        <p>Manage your upcoming healthcare bookings in one place.</p>
      </div>

      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <h3>{appointments.length}</h3>
          <p>Total Appointments</p>
        </div>

        <div className="dashboard-stat-card">
          <h3>{appointments.filter((item) => item.status === "Upcoming").length}</h3>
          <p>Upcoming</p>
        </div>

        <div className="dashboard-stat-card">
          <h3>
            {
              [...new Set(appointments.map((item) => item.specialty))].length
            }
          </h3>
          <p>Specialties Booked</p>
        </div>
      </div>


      {appointments.length === 0 ? (
        <div className="empty-dashboard">
          <h2>No appointments booked yet</h2>
          <p>Your confirmed appointments will appear here.</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-card-top">
                <div className="appointment-card-left">
                  <img
                    src={appointment.image}
                    alt={appointment.doctorName}
                    className="appointment-doctor-image"
                  />

                  <div className="appointment-info">
                    <h2>{appointment.doctorName}</h2>
                    <p>{appointment.specialty}</p>
                    <p>{appointment.location}</p>
                  </div>
                </div>

                <span className="appointment-status">
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-details-grid">
                <div className="detail-pill">
                  <span className="detail-label">Patient</span>
                  <p>{appointment.patientName}</p>
                </div>

                <div className="detail-pill">
                  <span className="detail-label">Age</span>
                  <p>{appointment.patientAge}</p>
                </div>

                <div className="detail-pill">
                  <span className="detail-label">Gender</span>
                  <p>{appointment.gender}</p>
                </div>

                <div className="detail-pill">
                  <span className="detail-label">Date</span>
                  <p>{appointment.appointmentDate}</p>
                </div>

                <div className="detail-pill">
                  <span className="detail-label">Time</span>
                  <p>{appointment.timeSlot}</p>
                </div>

                <div className="detail-pill">
                  <span className="detail-label">Address</span>
                  <p>{appointment.address}</p>
                </div>
              </div>

              <div className="appointment-reason-box">
                <span className="detail-label">Reason for Visit</span>
                <p>{appointment.reason}</p>
              </div>
              {editingId === appointment.id ? (
                <div className="edit-appointment-box">
                  <h3>Reschedule Appointment</h3>

                  <div className="calendar-wrapper dashboard-calendar">
                    <Calendar
                      onChange={(date) =>
                        setEditData((prev) => ({
                          ...prev,
                          appointmentDate: formatSelectedDate(date),
                        }))
                      }
                      value={
                        editData.appointmentDate
                          ? new Date(editData.appointmentDate)
                          : null
                      }
                      minDate={new Date()}
                    />
                  </div>

                  <div className="time-options">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`time-pill ${editData.timeSlot === slot ? "selected-pill" : ""
                          }`}
                        onClick={() =>
                          setEditData((prev) => ({
                            ...prev,
                            timeSlot: slot,
                          }))
                        }
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows="4"
                    value={editData.reason}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    placeholder="Update reason for visit"
                    className="dashboard-textarea"
                  />

                  <div className="dashboard-action-buttons">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => handleSaveEdit(appointment)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="dashboard-action-buttons">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => handleEditClick(appointment)}
                  >
                    Edit / Reschedule
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;