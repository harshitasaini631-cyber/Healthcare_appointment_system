import { useState } from "react";
import doctorsData from "../data/fallbackDoctors";
import DoctorCard from "../components/DoctorCard";

function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <div className="doctors-page-header">
        <h1>Find Your Specialist</h1>
        <p>Choose from trusted doctors in your city.</p>
      </div>

      <div className="search-bar-wrapper">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search by doctor name or specialty"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="doctors-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;