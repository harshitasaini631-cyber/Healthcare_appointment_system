import { useAppointmentContext } from "../context/AppointmentContext";

function Dashboard() {
  const { appointments } = useAppointmentContext();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Appointments</h1>
        <p>Manage your upcoming healthcare bookings in one place.</p>
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

                <span className="appointment-status">
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-details">
                <p><strong>Patient:</strong> {appointment.patientName}</p>
                <p><strong>Age:</strong> {appointment.patientAge}</p>
                <p><strong>Gender:</strong> {appointment.gender}</p>
                <p><strong>Address:</strong> {appointment.address}</p>
                <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p><strong>Time:</strong> {appointment.timeSlot}</p>
                <p><strong>Reason:</strong> {appointment.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;