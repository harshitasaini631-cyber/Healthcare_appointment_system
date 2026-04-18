import { useParams, Link } from "react-router-dom";
import doctorsData from "../data/fallbackDoctors";

function DoctorDetails() {
  const { id } = useParams();

  const doctor = doctorsData.find((doc) => doc.id === Number(id));

  if (!doctor) {
    return <h2>Doctor not found</h2>;
  }

  return (
    <div className="doctor-details-page">
      <div className="doctor-details-card">
        <div className="doctor-details-image-wrapper">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="doctor-details-image"
          />
        </div>

        <div className="doctor-details-content">
          <p className="doctor-tag">Available in your city</p>
          <h1>{doctor.name}</h1>
          <p className="doctor-specialty">{doctor.specialty}</p>

          <div className="doctor-info-list">
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <p><strong>Location:</strong> {doctor.location}</p>
            <p><strong>Rating:</strong> ⭐ {doctor.rating}</p>
          </div>

          <p className="doctor-about">
            {doctor.name} is a trusted {doctor.specialty.toLowerCase()} with a
            patient-focused approach, providing expert consultation and quality
            care in {doctor.location}.
          </p>

          <div className="doctor-details-buttons">
            <Link to="/doctors" className="back-btn">
              Back to Doctors
            </Link>

            <Link to={`/book/${doctor.id}`} className="book-btn">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;