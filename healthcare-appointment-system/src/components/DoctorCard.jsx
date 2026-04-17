import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} className="doctor-image" />

      <div className="doctor-card-content">
        <h3>{doctor.name}</h3>
        <p>{doctor.specialty}</p>
        <p>{doctor.experience}</p>
        <p>{doctor.location}</p>
        <p>⭐ {doctor.rating}</p>

        <Link to={`/doctor/${doctor.id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;